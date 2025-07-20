import React, { useState } from "react";
import "./Styles.css";
import axios from "axios";
import Navbar from "./NavBar";
import Footer from "./Footer";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/contact", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="content-wrapper">
        <div className="contact-container">
          <h2>Contact Us</h2>
          {submitted ? (
            <p className="success-msg">Thank you for reaching out! We'll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
