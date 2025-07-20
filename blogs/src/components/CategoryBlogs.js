import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NavBar from './NavBar';  // Assuming NavBar is imported
import './Styles.css';  // Assuming Styles.css contains the necessary styles

const CategoryBlogs = () => {
  const { category } = useParams();  // Get category from the URL params
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blogs based on the selected category
    axios
      .get(`http://localhost:5000/categories/${category}`)
      .then((response) => {
        setBlogs(response.data);  // Update state with fetched blogs
        setLoading(false);         // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError(err.message);    // Handle error
        setLoading(false);        // Set loading to false after error
      });
  }, [category]);  // Dependency array ensures the effect runs when 'category' changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Capitalizing the first letter of the category for display
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="mainpage-container">
      <NavBar />  {/* Add Navbar component here */}

      <div className="blog-container">
        {blogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img src={blog.IMGURL} alt={blog.title} className="blog-image" />
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-summary">{blog.summary}</p>
            <Link to={`/blogs/${blog.SLUG}`} className="read-more">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBlogs;
