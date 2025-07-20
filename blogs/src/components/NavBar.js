// Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // clear input after search
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>

        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">🔍</button>
        </form>
        {/* <Link to="/cart" className="cart-icon">🛒</Link>
        <Link to="/profile" className="user-icon">👤</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
