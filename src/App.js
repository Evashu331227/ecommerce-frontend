import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";      // ✅ Welcome screen
import CheckoutPage from "./pages/CheckoutPage"; // ✅ Add this page

function App() {
  console.log("✅ App.js has loaded!");  // NEW LOG LINE

  return (
    <Router>
      <Navbar />
      <h1 style={{ textAlign: "center", margin: "10px 0" }}>
        🛍️ Welcome to Evashu's E-Commerce Store!
      </h1>

      <Routes>
        {/* 🏠 Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* 📦 Products Page */}
        <Route path="/products" element={<ProductPage />} />

        {/* 🛒 Cart Page */}
        <Route path="/cart" element={<CartPage />} />

        {/* 💳 Checkout Page */}
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
