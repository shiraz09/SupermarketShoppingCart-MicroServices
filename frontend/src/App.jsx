import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* ברירת מחדל - ניתוב ל- /login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* דף התחברות */}
          <Route path="/login" element={<LoginForm />} />

          {/* דף הרשמה */}
          <Route path="/register" element={<RegisterForm />} />

          {/* דף מוצרים */}
          <Route path="/products" element={<ProductListPage />} />

          {/* דף הבית */}
          <Route path="/home" element={<HomePage />} />

          {/* דף עגלת קניות */}
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
