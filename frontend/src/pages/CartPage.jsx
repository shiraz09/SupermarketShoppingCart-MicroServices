import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const resetCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setSelectedItems([]);
  };

  const toggleItemSelection = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((i) => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const removeSelectedItems = () => {
    const updatedCart = cart.filter((_, index) => !selectedItems.includes(index));
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedItems([]);
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-details">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleItemSelection(index)}
                    className="item-checkbox"
                  />
                  <span>{item.name}</span>
                </div>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <strong>Total: ${calculateTotalPrice()}</strong>
          </div>
        </>
      )}

      <div className="button-container">
        <button
          className={`button remove-button ${
            selectedItems.length === 0 ? "hidden" : ""
          }`}
          onClick={removeSelectedItems}
          disabled={selectedItems.length === 0}
        >
          Remove Selected Items
        </button>
        <button className="button reset-button" onClick={resetCart}>
          Reset Cart
        </button>
        <button
          className={`button checkout-button ${cart.length === 0 ? "hidden" : ""}`}
          onClick={() => alert("Checkout functionality is not implemented yet!")}
        >
          Proceed to Checkout
        </button>
        <button className="button back-button" onClick={() => window.history.back()}>
          Back to Shop
        </button>
      </div>
    </div>
  );
};

export default CartPage;
