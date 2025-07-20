import React from "react";
import "./Styles.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

function AboutUs() {
  return (
    <>
    <NavBar></NavBar>
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-intro">
        Welcome to our blog – your everyday companion for a better, smarter life.
      </p>

      <section className="about-section">
        <h2>🌟 Our Mission</h2>
        <p>
          Our goal is simple — to help you navigate everyday challenges with ease, whether it's finding useful tips, staying informed, or discovering inspiring stories. Life can get overwhelming, but with the right support, you can tackle anything.
        </p>
      </section>

      <section className="about-section">
        <h2>💡 What We Do</h2>
        <p>
          We create and share helpful content across a wide range of topics — from productivity and wellness to money-saving hacks, tech tips, and lifestyle advice. Our content is designed to make your life simpler, happier, and more informed.
        </p>
      </section>

      <section className="about-section">
        <h2>🤝 Why It Matters</h2>
        <p>
          We believe in the power of community and the impact of small improvements. By providing practical, real-life solutions, we hope to make your daily routine more manageable and meaningful.
        </p>
      </section>

      <section className="about-section">
        <h2>📬 Get in Touch</h2>
        <p>
          We love hearing from you! Whether you have suggestions, ideas, or just want to say hello, feel free to reach out through our <a href="/contact">Contact Page</a>.
        </p>
      </section>

      <p className="about-thanks">Thanks for being here. We’re glad you’re part of our journey.</p>
    </div>
    <Footer></Footer>
    </>
  );
}

export default AboutUs;
