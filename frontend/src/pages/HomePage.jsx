import React from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "../components/AddProductForm";
import SearchProducts from "../components/SearchProducts";
import "../styles/Home.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>The Digital Shopping Cart</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
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
