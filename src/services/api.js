import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const saveCartItem = async (item) => {
  try {
    const response = await axios.post(`${API_BASE}/cart`, item);
    return response.data;
  } catch (error) {
    console.error("Error saving cart item:", error);
    throw error;
  }
};

export const getCartByUser = async (email) => {
  try {
    const response = await axios.get(`${API_BASE}/cart/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const clearCartForUser = async (email) => {
  try {
    await axios.delete(`${API_BASE}/cart/${email}`);
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
