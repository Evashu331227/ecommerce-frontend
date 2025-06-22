import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [finalItems, setFinalItems] = useState([]);

  const getTotal = (items) => {
    return items.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      return sum + price * quantity;
    }, 0);
  };

  const handlePlaceOrder = () => {
    setFinalItems(cartItems); // Save current cart before clearing
    setOrderPlaced(true);
    clearCart(); // Now clear cart
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>🧾 Checkout</h2>

      {orderPlaced ? (
        <div>
          <h3>✅ Order placed successfully!</h3>
          <h4>Order Summary</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {finalItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                {item.productName || item.name} × {item.quantity} = $
                {(parseFloat(item.price) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: ${getTotal(finalItems).toFixed(2)}</h4>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlaceOrder();
          }}
        >
          <h3>Shipping Details</h3>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Full Name"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Address"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="City"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="ZIP Code"
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <h3>Order Summary</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>
                {item.productName || item.name} × {item.quantity} = $
                {(parseFloat(item.price) * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <h4>Total: ${getTotal(cartItems).toFixed(2)}</h4>

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;
