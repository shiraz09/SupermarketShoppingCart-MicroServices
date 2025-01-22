import React, { useState } from "react";
import { addProduct } from "../api";

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
   
  };

  // עדכון המוצר והקטגוריה
  const [product, setProduct] = useState({
    category: "Fruits",
    name: "Apple",
    price: 2,
  });

  // שינוי קטגוריה
  const handleCategoryChange = (category) => {
    const firstProduct = categories[category][0];
    setProduct({
      category,
      name: firstProduct.name,
      price: firstProduct.price,
    });
  };

  // שינוי מוצר
  const handleProductChange = (productName) => {
    const selectedProduct = categories[product.category].find(
      (item) => item.name === productName
    );
    setProduct({ ...product, name: selectedProduct.name, price: selectedProduct.price });
  };

  // שליחת הטופס
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(product);
      alert("Product added successfully!");
    } catch {
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Add to Cart</h2>
      
      {/* קטגוריה */}
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

      {/* מוצר */}
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

      {/* מחיר */}
      <label style={{ display: "flex", alignItems: "center" }}>
        Price:
        <div style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}>
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
  );
};

export default AddProductForm;
