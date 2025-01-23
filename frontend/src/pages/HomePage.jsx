import React, { useState } from "react";
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
  const [cart, setCart] = useState([]);

  // הוספת מוצר לעגלה
  const handleAddToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // עדכון כמות של פריט בעגלה
  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // הסרת מוצר מהעגלה
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>The Digital Shopping Cart</h1>
      </header>

      <div className="content">
        {/* קטגוריות */}
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
          {/* עגלה בצד ימין */}
          <div className="sidebar">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty!</p>
            ) : (
              <ul className="cart-list">
                {cart.map((item) => (
                  <li key={item._id} className="cart-item">
                    <div className="item-details">
                      <span>{item.name}</span> x {item.quantity}
                    </div>
                    <div className="item-actions">
                      <button
                        onClick={() => handleQuantityChange(item._id, -1)}
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleQuantityChange(item._id, 1)}
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item._id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* מוצרים */}
          <div className="products-container">
            <SearchProducts
              selectedCategory={selectedCategory}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
