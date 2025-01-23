import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // ולידציה בסיסית לפרטים
    if (username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4007/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registered successfully! Now you can log in.");
        navigate("/login"); // מעבר לעמוד ההתחברות
      } else {
        alert(data.error || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred. Please try again later.");

    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register</h2>
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
          backgroundColor: "#38a169",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Register
      </button>
      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer", color: "blue" }}
        >
          Log in here
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
