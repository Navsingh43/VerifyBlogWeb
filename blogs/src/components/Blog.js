// Blog.js

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./Styles.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Blog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/${slug}`)
      .then((response) => {
        setBlog(response.data);
        setLikes(response.data.LIKES);
        setDislikes(response.data.DISLIKES);
        setComments(response.data.comments || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setError("Blog not found.");
        setLoading(false);
      });
  }, [slug]);

  const handleLike = () => {
    axios
      .post(`http://localhost:5000/blogs/${slug}/like`, {}, { withCredentials: true })
      .then(() => {
        setLikes((prev) => prev + 1);
        setDislikes((prev) => (prev > 0 ? prev - 1 : 0));
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("You’ve already liked this blog!");
        } else {
          console.error("Error liking blog:", error);
        }
      });
  };

  const handleDislike = () => {
    axios
      .post(`http://localhost:5000/blogs/${slug}/dislike`, {}, { withCredentials: true })
      .then(() => {
        setDislikes((prev) => prev + 1);
        setLikes((prev) => (prev > 0 ? prev - 1 : 0));
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert("You’ve already disliked this blog!");
        } else {
          console.error("Error disliking blog:", error);
        }
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !commenterName.trim()) return;

    axios
      .post(
        `http://localhost:5000/blogs/${slug}/comments`,
        {
          content: newComment,
          commenterName: commenterName,
          slug: slug,
        },
        { withCredentials: true }
      )
      .then((response) => {
        setComments((prev) => [...prev, response.data]);
        setNewComment("");
        setCommenterName("");
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
      });
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <>
      <NavBar />
      <div className="blog-page">
        <h1 className="blog-title">{blog.title}</h1>
        <img src={blog.IMGURL} alt={blog.title} className="blog-image-full" />

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.CONTENT }} />

        <div className="like-dislike-container">
          <button className="like-button" onClick={handleLike}>👍 {likes}</button>
          <button className="dislike-button" onClick={handleDislike}>👎 {dislikes}</button>
        </div>

        <div className="comments-section">
          <h3>Comments</h3>
          <ul className="comment-list">
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                <strong>{comment.commenterName || "Anonymous"}:</strong> {comment.content}
                <div className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>

          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={commenterName}
              onChange={(e) => setCommenterName(e.target.value)}
              placeholder="Your name"
              required
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
            ></textarea>
            <button type="submit" className="submit-comment">Post Comment</button>
          </form>
        </div>

        <Link to="/" className="back-button">Back to Blogs</Link>
      </div>
      <Footer />
    </>
  );
}

export default Blog;
