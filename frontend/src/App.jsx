import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductListPage from "./pages/ProductListPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
