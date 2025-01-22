import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
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
        navigate("/login"); // מעבר לעמוד התחברות
      } else {
        alert(data.error || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
      <p>
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "blue" }}>
          Log in here
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
