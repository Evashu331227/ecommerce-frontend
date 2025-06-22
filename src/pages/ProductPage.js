import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        <span role="img" aria-label="Product bag">🛍️</span>{" "}
        <strong>Product Page</strong>
      </h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              width: "300px",
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";
              }}
            />
            <h2 style={{ fontSize: "20px", margin: "10px 0 5px" }}>{product.name}</h2>
            <p style={{ color: "#555", margin: "5px 0" }}>{product.description}</p>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              ${product.price.toFixed(2)}
            </p>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: "10px 16px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
