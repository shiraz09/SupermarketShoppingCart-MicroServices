import axios from "axios";



// הוספת מוצר לעגלה
export const addToCart = async (item) => {
  try {
    const response = await axios.post("http://localhost:4001/add_to_cart", item);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    throw error;
  }
};



// חיפוש מוצרים
export const searchProducts = async (query) => {
  try {
    const response = await axios.get("http://localhost:4009/search_products", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching products:", error.message);
    throw error;
  }
};


// התחברות משתמש
export const login = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:4006/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// הרשמת משתמש חדש
export const register = async (user) => {
  try {
    const response = await axios.post("http://localhost:4007/register", user);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};
