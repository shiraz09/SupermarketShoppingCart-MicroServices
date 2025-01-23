import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchProducts from "../components/SearchProducts";
import "../styles/Home.css";

const HomePage = () => {
  const categories = [
    "Fruits",
    "Vegetables",
    "Snacks",
    "Beverages",
    "Meat",
    "Dairy",
    "Bakery",
    "Frozen",
    "Cleaning",
    "Baby",
  ];

  const [selectedCategory, setSelectedCategory] = useState("Fruits");
  const [isCartEmpty, setIsCartEmpty] = useState(true); // Track if cart is empty
  const navigate = useNavigate();

  // Fetch cart state on component mount
  useEffect(() => {
    const fetchCartState = async () => {
      const username = localStorage.getItem("username");
      if (!username) {
        setIsCartEmpty(true); // No user logged in, cart is empty
        return;
      }

      try {
        // Fetch cart from /get_cart endpoint
        const response = await fetch(`http://localhost:4005/get_cart/${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }

        const data = await response.json();
        setIsCartEmpty(!data.cart || data.cart.length === 0); // Update cart state based on response
      } catch (error) {
        console.error("Error fetching cart state:", error);
        setIsCartEmpty(true); // Default to empty if error occurs
      }
    };

    fetchCartState();
  }, []);

  const handleCartUpdate = () => {
    setIsCartEmpty(false); // Update state when a product is added to cart
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>The Digital Shopping Cart</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="content">
        <nav className="categories-bar">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                category === selectedCategory ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </nav>

        <div className="main-content">
          <div className="sidebar">
            <h2>Shopping Cart</h2>
            {/* Change button based on cart state */}
            {isCartEmpty ? (
              <p>Your cart is empty!</p>
            ) : (
              <button
                onClick={() => navigate("/cart")}
                className="view-cart-button"
              >
                View Cart
              </button>
            )}
          </div>

          <div className="products-container">
            <SearchProducts
              selectedCategory={selectedCategory}
              onCartUpdate={handleCartUpdate} // Pass the callback to update cart state
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
