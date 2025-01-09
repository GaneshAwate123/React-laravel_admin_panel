import React, { useState } from "react";
import axios from "axios";
import "../homePage.css";

function HomePage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleTabSwitch = (tab) => setActiveTab(tab);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
      localStorage.setItem("token", response.data.access_token);
      alert("Login successful");
      window.location.href = "/admin";
    } catch (error) {
      alert("Invalid login credentials");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/register", registerData);
      alert("Registration successful! You can now log in.");
      setActiveTab("login"); // Switch to login tab
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
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                required
              />
              <button type="submit">Login</button>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <h2>Register</h2>
              <input
                type="text"
                placeholder="Name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                required
              />
              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
