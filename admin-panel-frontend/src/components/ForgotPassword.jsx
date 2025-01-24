import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "../forgotPassword.css";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      alert(response.data.message || "Password reset successful!");
      navigate("/")
    } catch (error) {
        if (error.response && error.response.data.errors) {
          const errors = error.response.data.errors;
          alert(Object.values(errors).flat().join("\n")); // Display validation errors
        } else {
          alert("Failed to reset password. Please try again.");
        }
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        <Link to="/" className="back-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
