import React, { useState } from "react";
import { addToCart } from "../api";

const AddToCartForm = () => {
  const [item, setItem] = useState({
    user_id: "",
    product_id: "",
    quantity: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addToCart(item);
      alert(response.message);
    } catch (error) {
      alert("Error adding to cart");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add To Cart</h2>
      <input
        type="text"
        placeholder="User ID"
        value={item.user_id}
        onChange={(e) => setItem({ ...item, user_id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product ID"
        value={item.product_id}
        onChange={(e) => setItem({ ...item, product_id: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={item.quantity}
        onChange={(e) => setItem({ ...item, quantity: e.target.value })}
      />
      <button type="submit">Add To Cart</button>
    </form>
  );
};

export default AddToCartForm;
