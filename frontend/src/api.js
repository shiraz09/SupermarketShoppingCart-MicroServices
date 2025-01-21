import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/get_products`);
  return response.data;
};

export const getCartItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/get_cart_items/user_id`);
  return response.data;
};

export const addToCart = async (product) => {
  const response = await axios.post(`${API_BASE_URL}/add_product_to_cart`, product);
  return response.data;
};

export const updateQuantity = async (productId, quantity) => {
  const response = await axios.patch(`${API_BASE_URL}/update_quantity`, { productId, quantity });
  return response.data;
};

export const deleteFromCart = async (productId) => {
  const response = await axios.delete(`${API_BASE_URL}/delete_product_from_cart/user_id/${productId}`);
  return response.data;
};
