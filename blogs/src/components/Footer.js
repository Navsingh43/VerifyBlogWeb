import React from "react";
import "./Styles.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} My Blog Site. All rights reserved.</p>
        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact-us">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
