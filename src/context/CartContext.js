import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userEmail = "evashu@example.com";
  const auth = { username: "evashu", password: "pass123" };

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cart/${userEmail}`, {
          auth,
        });
        console.log("🛒 Loaded cart items from backend:", response.data);
        setCartItems(response.data);
      } catch (error) {
        console.error("❌ Failed to load cart:", error);
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const item = {
      productId: product.id || product.productId,
      productName: product.name || product.productName,
      price: product.price,
      quantity: 1,
      userEmail,
    };

    console.log("🟢 Attempting to add to cart:", item);

    try {
      const response = await axios.post("http://localhost:8080/api/cart", item, {
        auth,
      });

      console.log("✅ Successfully added to cart:", response.data);
      setCartItems((prevItems) => [...prevItems, response.data]);
    } catch (error) {
      console.error("❌ Error adding to cart:", error?.response?.data || error.message);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/${userEmail}`, {
        auth,
      });
      console.log("🧹 Cart cleared.");
      setCartItems([]);
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) return; // prevent negative quantities

    try {
      await axios.patch(
        `http://localhost:8080/api/cart/update/${itemId}?quantity=${newQuantity}`,
        {},
        { auth }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("❌ Error updating quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, clearCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
