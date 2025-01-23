import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4006/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // שמירת שם המשתמש ב-Local Storage
        localStorage.setItem("username", data.username);

        alert("Login successful!");
        navigate("/home"); // ניתוב לעמוד הבית

      } else {
        alert(data.error || "Login failed!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: "block", margin: "10px 0", padding: "8px", width: "100%" }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#3182ce",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Login
      </button>
      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Register here
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
