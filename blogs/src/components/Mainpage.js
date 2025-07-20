import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";  // Importing Navbar Component
import "./Styles.css";
import Footer from "./Footer"

export class Mainpage extends Component {
  state = { blogs: [] };

  componentDidMount() {
    axios
      .get("http://localhost:5000/blogs")
      .then((response) => {
        this.setState({ blogs: response.data });
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }

  render() {
    return (
      <>
      <div className="mainpage-container">
        {/* Navbar */}
        <NavBar />  {/* Add Navbar component here */}

        {/* Blog Cards Section */}
        <div className="blog-container">
          {this.state.blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <img src={blog.IMGURL} alt={blog.title} className="blog-image" />
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-summary">{blog.summary}</p>
              <Link to={`/blogs/${blog.SLUG}`} className="read-more">Read More</Link>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
      </>
    );
  }
}

export default Mainpage;
