import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";      // ✅ Welcome screen
import CheckoutPage from "./pages/CheckoutPage"; // ✅ Add this page

function App() {
  return (
    <Router>
      <Navbar />

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
