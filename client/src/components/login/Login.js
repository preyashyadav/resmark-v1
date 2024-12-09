import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Store the token and username in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      // Call onLogin from App.js to handle login state
      onLogin(response.data.token, response.data.username);

      setMessage("Login successful");
    } catch (error) {
      setMessage("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Login with ResVault
        </button>
      </form>
      {message && <p className="login-message">{message}</p>}
      <div className="login-links">
        <Link to="/forgot-password" className="link">
          Forgot Password?
        </Link>
        <span> | </span>
        <Link to="/register" className="link">
          New user? Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
