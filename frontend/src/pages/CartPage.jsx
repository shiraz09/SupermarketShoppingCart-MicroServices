import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const [cart, setCart] = useState([]); // Cart items
  const username = localStorage.getItem("username"); // Get username from local storage
  const [error, setError] = useState(null); // State to track errors
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook

  // Load cart from server
  useEffect(() => {
    const fetchCart = async () => {
      if (!username || username.trim() === "") {
        setError("Username not found. Please log in first.");
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:4003/get_cart/${username}`);
        if (!response.ok) {
          throw new Error("Failed to load cart");
        }

        const data = await response.json();
        if (data.error) {
          setError(data.error); // Show error message if user not found
          return;
        }

        setCart(data.cart || []); // Update cart state with fetched data
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to fetch cart. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [username]);

  // Delete a single item from the cart
  const deleteItem = async (productId) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4003/delete_product/${username}/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      const data = await response.json();
      setCart(data.cart || []); // Update cart state after deletion
      alert("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the entire cart
  const resetCart = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:4003/reset_cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) {
        throw new Error("Failed to reset cart");
      }

      const data = await response.json();
      setCart(data.cart || []); // Clear the cart after reset
      alert("Cart has been reset successfully.");
    } catch (error) {
      console.error("Error resetting cart:", error);
      alert("Failed to reset cart. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Placeholder for payment functionality
  const handlePayment = async () => {
    try {
      if (!username) {
        alert("No user logged in. Please log in first.");
        return;
      }

      alert(`Proceeding to payment for ${username}'s cart.`);
      console.log("Cart items:", cart);
    } catch (error) {
      console.error("Error during payment process:", error);
      alert("Payment process failed. Please try again later.");
    }
  };

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);
  };

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>{username ? `${username}'s Cart` : "Your Cart"}</h2>
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item._id} className="cart-item">
                <div className="item-details">
                  <span>{item.name}</span>
                </div>
                <span className="item-price">${(item.price || 0).toFixed(2)}</span>
                <button className="delete-button" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-actions">
            <button className="reset-button" onClick={resetCart}>
              Reset Cart
            </button>
            <button className="pay-button" onClick={handlePayment}>
              Proceed to Payment
            </button>
          </div>
          <div className="total-price">
            <strong>Total: ${calculateTotalPrice()}</strong>
          </div>
        </>
      )}
      <button className="back-button" onClick={() => navigate("/home")}>Back to Home</button>
    </div>
  );
};

export default CartPage;
