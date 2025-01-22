import React from "react";
import AddProductForm from "../components/AddProductForm";
import SearchProducts from "../components/SearchProducts";
import "../styles/Home.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Supermarket Shopping Cart System</h1>
      </header>

      <div className="content">
        {/* רכיבי טופס והוספה */}
        <div className="form-card">
          <AddProductForm />
        </div>
        <div className="form-card">
          <SearchProducts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
