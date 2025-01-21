import React, { useState, useEffect } from "react";
import { getCartItems } from "../api";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "12345"; // Replace with dynamic user ID

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems(userId);
        setCartItems(items);
      } catch (error) {
        alert("Failed to load cart items");
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.name} - Quantity: {item.quantity} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
