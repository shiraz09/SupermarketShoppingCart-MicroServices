import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const categories = {
    Fruits: [
      { name: "Apple", price: 2 },
      { name: "Banana", price: 1 },
      { name: "Pineapple", price: 4 },
      { name: "Orange", price: 3 },
      { name: "Strawberry", price: 8 },
    ],
    Vegetables: [
      { name: "Tomato", price: 2 },
      { name: "Cucumber", price: 1.5 },
      { name: "Orange pepper", price: 1.5 },
      { name: "Red pepper", price: 1.5 },
      { name: "Yellow pepper", price: 1.5 },
    ],
    Snacks: [
      { name: "Chips", price: 3 },
      { name: "Cookies", price: 4 },
    ],
    Beverages: [
      { name: "Water", price: 1 },
      { name: "Juice", price: 3 },
      { name: "Soda", price: 2 },
      { name: "Coffee", price: 4 },
      { name: "Tea", price: 3 },
      { name: "Wine", price: 10 },
      { name: "Lemonade", price: 3 },
    ],
    Bakery: [
      { name: "Bread", price: 2 },
      { name: "Bagel", price: 1.5 },
      { name: "Croissant", price: 2.5 },
      { name: "Muffin", price: 3 },
      { name: "Cake", price: 4 },
      { name: "Doughnut", price: 1.5 },
      { name: "Baguette", price: 3 },
      { name: "Pita", price: 1 },
    ],
    Meat: [
      { name: "Chicken", price: 5 },
      { name: "Beef", price: 10 },
      { name: "Fish", price: 6 },
      { name: "Sausage", price: 4 },
    ],
    Dairy: [
      { name: "Cheese", price: 3 },
      { name: "Milk", price: 2 },
      { name: "Butter", price: 2.5 },
      { name: "Yogurt", price: 1.5 },
      { name: "Cottage Cheese", price: 2 },
      { name: "Sour Cream", price: 2 },
      { name: "Ice Cream", price: 4 },
      { name: "Whipped Cream", price: 3.5 },
    ],
    Cleaning: [
      { name: "Bleach", price: 3 },
      { name: "Soap", price: 2 },
      { name: "Shampoo", price: 4 },
      { name: "Toothpaste", price: 3 },
      { name: "Toilet Paper", price: 2 },
      { name: "Disinfectant", price: 4 },
      { name: "Sponges", price: 2 },
      { name: "Floor Cleaner", price: 3 },
      { name: "Glass Cleaner", price: 3 },
    ],
    Frozen: [
      { name: "Frozen Peas", price: 2 },
      { name: "Frozen Pizza", price: 6 },
      { name: "Frozen Fries", price: 3 },
      { name: "Frozen Corn", price: 2.5 },
      { name: "Frozen Corn Schnitzel", price: 7 },
      { name: "Frozen cauliflower", price: 5 },
    ],
    Baby: [
      { name: "Diapers", price: 12 },
      { name: "Baby Wipes", price: 5 },
      { name: "Baby Lotion", price: 4 },
      { name: "Baby Shampoo", price: 3 },
      { name: "Baby Food", price: 6 },
      { name: "Pacifier", price: 3 },
    ],
  };

  const [product, setProduct] = useState({
    category: "Fruits",
    name: "Apple",
    price: 2,
  });

  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    const firstProduct = categories[category][0];
    setProduct({
      category,
      name: firstProduct.name,
      price: firstProduct.price,
    });
  };

  const handleProductChange = (productName) => {
    const selectedProduct = categories[product.category].find(
      (item) => item.name === productName
    );
    setProduct({ ...product, name: selectedProduct.name, price: selectedProduct.price });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username"); // קבלת שם המשתמש מ-Local Storage
    if (!username) {
      alert("No user logged in. Please log in first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, // שליחת שם המשתמש לשרת
          name: product.name,
          category: product.category,
          price: product.price,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert(`Failed to add product: ${data.error}`);
      }
    } catch (error) {
      alert("An error occurred while adding the product.");
      console.error(error);
    }
  };

  const handleShowCart = () => {
    navigate("/cart");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <h2>Add to Cart</h2>

        <label>
          Category:
          <select
            value={product.category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Product:
          <select
            value={product.name}
            onChange={(e) => handleProductChange(e.target.value)}
          >
            {categories[product.category].map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label style={{ display: "flex", alignItems: "center" }}>
          Price:
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
          >
            <span style={{ fontSize: "1.2rem", marginRight: "5px" }}>$</span>
            <input
              type="number"
              value={product.price}
              disabled
              style={{
                width: "100px",
                padding: "5px",
                textAlign: "right",
                fontSize: "1rem",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </div>
        </label>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#3182ce",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>

      <button
        onClick={handleShowCart}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#38a169",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default AddProductForm;
