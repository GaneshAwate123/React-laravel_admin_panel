import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../homePage.css";

function HomePage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);

    // Clear form data and errors when switching tabs
    setLoginData({ email: "", password: "" });
    setRegisterData({ name: "", email: "", password: "" });
    setErrors({});
  };

  const regexPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/, // Name: 2-50 characters, letters and spaces only
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Password: 8+ chars, includes letters and numbers
  };

  const validateField = (name, value) => {
    const errorMessages = [];

    if (!value) {
      errorMessages.push(`Please enter the ${name}.`);
    } else if (regexPatterns[name] && !regexPatterns[name].test(value)) {
      switch (name) {
        case "name":
          errorMessages.push(
            "Name must be 2-50 characters long and contain only letters and spaces."
          );
          break;
        case "email":
          errorMessages.push("Invalid email format.");
          break;
        case "password":
          errorMessages.push(
            "Password must be at least 8 characters long and include a letter and a number."
          );
          break;
        default:
          break;
      }
    }

    return errorMessages;
  };

  const validateAllFields = (data) => {
    const newErrors = {};
    for (const key in data) {
      const fieldErrors = validateField(key, data[key]);
      if (fieldErrors.length > 0) {
        newErrors[key] = fieldErrors;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else if (type === "register") {
      setRegisterData({ ...registerData, [name]: value });
    }

    // Update individual field error immediately
    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldErrors,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields(loginData)) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);

      localStorage.setItem("token", response.data.access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
      alert("Login successful");
      window.location.href = "/admin";
    } catch (error) {
      alert("Invalid login credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields(registerData)) {
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/register", registerData);
      alert("Registration successful! You can now log in.");
      setActiveTab("login");
    } catch (error) {
      alert("Registration failed. Please check your details.");
    }
  };

  return (
    <div className="home-page">
      <div className="form-container">
        <div className="tabs">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => handleTabSwitch("register")}
          >
            Register
          </button>
        </div>

        <div className="form-content">
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit}>
              <h2>Login</h2>
              <input
                type="text"
                name="email"  
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, "login")}
              />
              {errors.email &&
                errors.email.map((err, idx) => (
                  <p key={idx} className="error-text">
                    {err}
                  </p>
                ))}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />
              {errors.password &&
                errors.password.map((err, idx) => (
                  <p key={idx} className="error-text">
                    {err}
                  </p>
                ))}
              <a
                href="#"
                onClick={() => navigate("/forgot-password")}
                className="forgot-password-link"
              >
                Forgot Password?
              </a>
              <button type="submit">Login</button>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <h2>Register</h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={registerData.name}
                onChange={(e) => handleInputChange(e, "register")}
              />
              {errors.name &&
                errors.name.map((err, idx) => (
                  <p key={idx} className="error-text">
                    {err}
                  </p>
                ))}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => handleInputChange(e, "register")}
              />
              {errors.email &&
                errors.email.map((err, idx) => (
                  <p key={idx} className="error-text">
                    {err}
                  </p>
                ))}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => handleInputChange(e, "register")}
              />
              {errors.password &&
                errors.password.map((err, idx) => (
                  <p key={idx} className="error-text">
                    {err}
                  </p>
                ))}
              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
