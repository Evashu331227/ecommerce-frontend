import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  const linkStyle = {
    color: "white",
    marginRight: "20px",
    textDecoration: "none",
    fontWeight: "normal",
  };

  const activeStyle = {
    textDecoration: "underline",
    fontWeight: "bold",
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left Links */}
      <div>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/products"
          style={({ isActive }) =>
            isActive ? { ...linkStyle, ...activeStyle } : linkStyle
          }
        >
          📦 Products
        </NavLink>
      </div>

      {/* Right Cart Info */}
      <NavLink
        to="/cart"
        style={({ isActive }) =>
          isActive ? { ...linkStyle, ...activeStyle } : linkStyle
        }
      >
        🛒 Cart ({cartItems.length})
      </NavLink>
    </nav>
  );
};

export default Navbar;
