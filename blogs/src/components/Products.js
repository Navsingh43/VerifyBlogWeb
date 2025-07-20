import React from "react";
import "./Styles.css";
import NavBar from "./NavBar";
import Footer from "./Footer"; // optional

const products = [
  {
    title: "Boxing Gloves",
    image: "https://m.media-amazon.com/images/I/81Dt9Jv9L4L._AC_SX679_.jpg",
    link: "https://amzn.to/4jURr6o",
  },
  {
    title: "Yoga Mat",
    image: "https://m.media-amazon.com/images/I/7153xLfdwAL._AC_SX679_.jpg",
    link: "https://amzn.to/3GONykQ",
  },
  {
    title: "Led Desk Lamp",
    image: "https://m.media-amazon.com/images/I/61-Ge5vWsiL._AC_SX679_.jpg",
    link: "https://amzn.to/3ZbkCcY",
  },
  {
    title: "Drill",
    image: "https://m.media-amazon.com/images/I/81H5q4ds-iL._AC_SX679_.jpg",
    link: "https://amzn.to/4kiAiDB",
  },
];

function ProductsPage() {
  return (
    <>
      <NavBar />
      <div className="products-container">
        <h1 className="products-heading">Recommended Products</h1>
        <div className="products-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
            <div>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3 className="product-title">{product.title}</h3>
            </div>
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="buy-now-button"
            >
              Buy Now
            </a>
          </div>
          
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductsPage;
