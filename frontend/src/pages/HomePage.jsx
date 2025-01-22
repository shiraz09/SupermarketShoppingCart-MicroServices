import React from "react";
import AddProductForm from "../components/AddProductForm";
import SearchProducts from "../components/SearchProducts";
import "../styles/Home.css";

const HomePage = () => {
  return (
    <div className="main-container">
      <header className="header">
        <h1>The Digital Shopping Cart</h1>
      </header>
      <div className="homepage-container">
        <div className="form-card">
          <SearchProducts />
        </div>
        <div className="form-card">
          <AddProductForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
