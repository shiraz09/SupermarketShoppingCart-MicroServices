import React, { useState, useEffect } from "react";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // טעינת הנתונים מ-localStorage בעת טעינת הדף
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (productId, delta) => {
    const updatedCart = cart.map((item) => {
      if (item._id === productId) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(1, newQuantity) }; // הכמות המינימלית היא 1
      }
      return item;
    });

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון localStorage
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // עדכון localStorage
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
                <td>{item.name}</td>
                <td>₪ {item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    style={{ padding: "5px", marginRight: "5px" }}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    style={{ padding: "5px", marginLeft: "5px" }}
                  >
                    +
                  </button>
                </td>
                <td>₪ {(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage;
