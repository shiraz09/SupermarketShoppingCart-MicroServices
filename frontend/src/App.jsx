import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

// רכיב שמוודא אם המשתמש מחובר
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // בדיקה אם יש טוקן ב-Local Storage בעת טעינת האתר
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        {isLoggedIn && (
          <button onClick={handleLogout} style={{ float: "right", margin: "10px" }}>
            Logout
          </button>
        )}
        <Routes>
          {/* דף התחברות */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

          {/* דף הרשמה */}
          <Route path="/register" element={<RegisterForm />} />

          {/* עמודים מוגנים */}
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
