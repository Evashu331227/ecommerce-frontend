import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { cartItems, setCartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const userEmail = "evashu@example.com";

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cart/${userEmail}`, {
        auth: {
          username: "evashu",
          password: "pass123",
        },
      })
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
      });
  }, []);

  const updateQuantity = async (item, newQuantity) => {
    if (newQuantity <= 0) return;

    try {
      await axios.patch(
        `http://localhost:8080/api/cart/update/${item.id}?quantity=${newQuantity}`,
        {},
        {
          auth: {
            username: "evashu",
            password: "pass123",
          },
        }
      );

      setCartItems((prev) =>
        prev.map((ci) =>
          ci.id === item.id ? { ...ci, quantity: newQuantity } : ci
        )
      );
    } catch (error) {
      console.error("❌ Failed to update quantity:", error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li
                key={index}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h3>{item.productName}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <button onClick={() => updateQuantity(item, item.quantity - 1)}>
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, item.quantity + 1)}>
                    ➕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3>Total: ${getTotal().toFixed(2)}</h3>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => {
                console.log("🧹 Clear Cart button clicked");
                clearCart();
              }}
              style={{
                padding: "10px 15px",
                backgroundColor: "#d9534f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
