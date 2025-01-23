import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const categories = {
    Fruits: [
      { name: "Apple", price: 2 },
      { name: "Banana", price: 1 },
      { name: "Pineapple", price: 4 },
      { name: "Orange", price: 3 },
      { name: "Mango", price: 5 },
      { name: "Grapes", price: 6 },
      { name: "Peach", price: 4 },
      { name: "Cherry", price: 7 },
      { name: "Strawberry", price: 8 },
      { name: "Blueberry", price: 9 },
    ],
    Vegetables: [
      { name: "Carrot", price: 1 },
      { name: "Tomato", price: 2 },
      { name: "Cucumber", price: 1.5 },
      { name: "Potato", price: 1 },
      { name: "Spinach", price: 3 },
      { name: "Onion", price: 1 },
      { name: "Pepper", price: 2.5 },
      { name: "Broccoli", price: 3 },
      { name: "Lettuce", price: 2 },
      { name: "Garlic", price: 2.5 },
    ],
    Snacks: [
      { name: "Chips", price: 3 },
      { name: "Cookies", price: 4 },
      { name: "Popcorn", price: 2 },
      { name: "Chocolate", price: 5 },
      { name: "Candy", price: 3 },
      { name: "Crackers", price: 2.5 },
      { name: "Nuts", price: 6 },
      { name: "Granola Bars", price: 4 },
      { name: "Pretzels", price: 2 },
      { name: "Biscuits", price: 3 },
    ],
    Beverages: [
      { name: "Water", price: 1 },
      { name: "Juice", price: 3 },
      { name: "Soda", price: 2 },
      { name: "Milk", price: 2.5 },
      { name: "Coffee", price: 4 },
      { name: "Tea", price: 3 },
      { name: "Beer", price: 5 },
      { name: "Wine", price: 10 },
      { name: "Smoothie", price: 6 },
      { name: "Lemonade", price: 3 },
    ],
    Bakery: [
      { name: "Bread", price: 2 },
      { name: "Bagel", price: 1.5 },
      { name: "Croissant", price: 2.5 },
      { name: "Muffin", price: 3 },
      { name: "Cake", price: 4 },
      { name: "Doughnut", price: 1.5 },
      { name: "Pie", price: 5 },
      { name: "Baguette", price: 3 },
      { name: "Pita", price: 1 },
      { name: "Roll", price: 1.2 },
    ],
    Meat: [
      { name: "Chicken", price: 5 },
      { name: "Beef", price: 10 },
      { name: "Pork", price: 8 },
      { name: "Turkey", price: 7 },
      { name: "Fish", price: 6 },
      { name: "Lamb", price: 12 },
      { name: "Sausage", price: 4 },
      { name: "Bacon", price: 5 },
      { name: "Ham", price: 6 },
      { name: "Duck", price: 9 },
    ],
    Dairy: [
      { name: "Cheese", price: 3 },
      { name: "Milk", price: 2 },
      { name: "Butter", price: 2.5 },
      { name: "Yogurt", price: 1.5 },
      { name: "Cream", price: 3 },
      { name: "Cottage Cheese", price: 2 },
      { name: "Sour Cream", price: 2 },
      { name: "Ice Cream", price: 4 },
      { name: "Milkshake", price: 3 },
      { name: "Whipped Cream", price: 3.5 },
    ],
    Cleaning: [
      { name: "Detergent", price: 3 },
      { name: "Soap", price: 2 },
      { name: "Shampoo", price: 4 },
      { name: "Toothpaste", price: 3 },
      { name: "Toilet Paper", price: 2 },
      { name: "Tissues", price: 1.5 },
      { name: "Disinfectant", price: 4 },
      { name: "Sponges", price: 2 },
      { name: "Floor Cleaner", price: 3 },
      { name: "Glass Cleaner", price: 3 },
    ],
    Frozen: [
      { name: "Frozen Peas", price: 2 },
      { name: "Frozen Pizza", price: 6 },
      { name: "Frozen Berries", price: 4 },
      { name: "Frozen Fries", price: 3 },
      { name: "Frozen Corn", price: 2.5 },
      { name: "Frozen Spinach", price: 3 },
      { name: "Frozen Shrimp", price: 8 },
      { name: "Frozen Chicken", price: 7 },
      { name: "Frozen Bread", price: 4 },
      { name: "Ice Cream", price: 5 },
    ],
    Baby: [
      { name: "Diapers", price: 12 },
      { name: "Baby Wipes", price: 5 },
      { name: "Formula", price: 15 },
      { name: "Baby Lotion", price: 4 },
      { name: "Baby Shampoo", price: 3 },
      { name: "Baby Powder", price: 2 },
      { name: "Baby Food", price: 6 },
      { name: "Pacifier", price: 3 },
      { name: "Baby Bottle", price: 7 },
      { name: "Teething Ring", price: 4 },
    ],
    Pets: [
      { name: "Dog Food", price: 10 },
      { name: "Cat Food", price: 8 },
      { name: "Bird Seed", price: 5 },
      { name: "Fish Food", price: 3 },
      { name: "Pet Shampoo", price: 6 },
      { name: "Pet Toys", price: 7 },
      { name: "Litter Box", price: 15 },
      { name: "Dog Leash", price: 12 },
      { name: "Cat Collar", price: 10 },
      { name: "Hamster Cage", price: 25 },
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
