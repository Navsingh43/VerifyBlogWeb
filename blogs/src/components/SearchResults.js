import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Styles.css"; // import the CSS
import Navbar from "./NavBar";

function SearchResults() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/search?query=${encodeURIComponent(query)}`
        );
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <Navbar></Navbar>
    <div className="search-results-container">    
      

      {loading ? (
        <p>Loading...</p>
      ) : blogs.length > 0 ? (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.IMGURL} alt={blog.SLUG} />
              <div className="blog-card-content">
                <h3 className="blog-card-title">{blog.SLUG}</h3>
                <p
                  className="blog-card-snippet"
                  dangerouslySetInnerHTML={{
                    __html: blog.CONTENT.slice(0, 200) + "...",
                  }}
                />
                <a href={`/blogs/${blog.SLUG}`} className="read-more-link">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
    </div>
  );
}

export default SearchResults;
