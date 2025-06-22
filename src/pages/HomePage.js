import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h1>Welcome to Our eCommerce Store</h1>
    <p>Browse amazing products at unbeatable prices!</p>
    <Link to="/products">
      <button style={{ padding: "10px 20px", fontSize: "16px" }}>Browse Products</button>
    </Link>
  </div>
);

export default HomePage;
