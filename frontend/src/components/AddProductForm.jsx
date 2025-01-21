import React, { useState } from "react";
import { addProduct } from "../api";

const AddProductForm = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProduct(product);
      alert(response.message);
    } catch (error) {
      alert("Error adding product");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Category"
        value={product.category}
        onChange={(e) => setProduct({ ...product, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={product.description}
        onChange={(e) =>
          setProduct({ ...product, description: e.target.value })
        }
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
