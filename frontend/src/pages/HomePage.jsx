import React from "react";

import AddProductForm from "../components/AddProductForm";
import AddToCartForm from "../components/AddToCartForm";
import SearchProducts from "../components/SearchProducts";
import "../styles/Home.css"; // קשר לקובץ ה-CSS

const HomePage = () => {
  return (
    <div>
      <h1>Supermarket Shopping Cart System</h1>
      
      <AddProductForm />
      <AddToCartForm />
      <SearchProducts />
    </div>
  );
};

export default HomePage;
