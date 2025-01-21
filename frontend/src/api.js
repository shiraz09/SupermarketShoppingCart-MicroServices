import axios from "axios";

// הוספת מוצר
export const addProduct = async (product) => {
  try {
    const response = await axios.post("http://localhost:4000/add_product", product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.message);
    throw error;
  }
};

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
// ביצוע תשלום (Checkout)
export const checkout = async (userId) => {
  const response = await axios.post("http://localhost:4002/checkout", { user_id: userId });
  return response.data;
};

// מחיקת מוצר
export const deleteProduct = async (productId) => {
  const response = await axios.delete(`http://localhost:4003/delete_product/${productId}`);
  return response.data;
};
// עריכת פרטי מוצר בעגלה
export const editProductInCart = async (userId, productId, updates) => {
  const response = await axios.put("http://localhost:4004/edit_product_in_cart", {
    user_id: userId,
    product_id: productId,
    ...updates,
  });
  return response.data;
};
// שליפת פריטים מהעגלה
export const getCartItems = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:4005/get_cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error.message);
    throw error;
  }
};
// מיון פריטים בעגלה
export const sortCart = async (userId, sortBy = "price", order = "asc") => {
  const response = await axios.post("http://localhost:4010/sort_cart", {
    user_id: userId,
    sort_by: sortBy,
    order: order,
  });
  return response.data;
};
// עדכון כמות מוצר בעגלה
export const updateQuantity = async (userId, productId, quantity) => {
  try {
    const response = await axios.patch("http://localhost:4011/update_quantity", {
      user_id: userId,
      product_id: productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating quantity:", error.message);
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

// איפוס עגלה
export const resetCart = async (userId) => {
  try {
    const response = await axios.post("http://localhost:4008/reset_cart", {
      user_id: userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting cart:", error.message);
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
