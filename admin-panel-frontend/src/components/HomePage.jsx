// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";  // Add this import
// import "../homePage.css";

// function HomePage() {
//   const [activeTab, setActiveTab] = useState("login");
//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [registerData, setRegisterData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();  // Declare the navigate hook

//   const handleTabSwitch = (tab) => setActiveTab(tab);

//   // Login functionality
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);
      
//       // Save token to localStorage
//       localStorage.setItem("token", response.data.access_token);

//       // Set the authorization header for future requests
//       axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;

//       // alert("Login successful");
//       console.log("Redirecting to admin page..."); 
//       // Redirect to the admin panel using useNavigate (no full page reload)
//       // navigate("/admin");
//       window.location.href = "/admin"; 
//     } catch (error) {
//       alert("Invalid login credentials");
//     }
//   };

//   // Register functionality
//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://127.0.0.1:8000/api/register", registerData);
//       alert("Registration successful! You can now log in.");
//       setActiveTab("login"); // Switch to login tab after registration
//     } catch (error) {
//       alert("Registration failed. Please check your details.");
//     }
//   };

//   return (
//     <div className="home-page">
//       <div className="form-container">
//         <div className="tabs">
//           <button
//             className={activeTab === "login" ? "active" : ""}
//             onClick={() => handleTabSwitch("login")}
//           >
//             Login
//           </button>
//           <button
//             className={activeTab === "register" ? "active" : ""}
//             onClick={() => handleTabSwitch("register")}
//           >
//             Register
//           </button>
//         </div>

//         <div className="form-content">
//           {activeTab === "login" && (
//             <form onSubmit={handleLoginSubmit}>
//               <h2>Login</h2>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={loginData.email}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, email: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={loginData.password}
//                 onChange={(e) =>
//                   setLoginData({ ...loginData, password: e.target.value })
//                 }
//                 required
//               />
//               <a
//                 href="#"
//                 onClick={() => navigate("/forgot-password")}
//                 className="forgot-password-link"
//               >
//                 Forgot Password?
//               </a>
//               <button type="submit">Login</button>
//             </form>
//           )}

//           {activeTab === "register" && (
//             <form onSubmit={handleRegisterSubmit}>
//               <h2>Register</h2>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={registerData.name}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, name: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={registerData.email}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, email: e.target.value })
//                 }
//                 required
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={registerData.password}
//                 onChange={(e) =>
//                   setRegisterData({ ...registerData, password: e.target.value })
//                 }
//                 required
//               />
//               <button type="submit">Register</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

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
    if (!value) {
      return `Please enter the ${name}.`;
    }

    if (regexPatterns[name] && !regexPatterns[name].test(value)) {
      switch (name) {
        case "name":
          return "Name must be 2-50 characters long and contain only letters and spaces.";
        case "email":
          return "Invalid email format.";
        case "password":
          return "Password must be at least 8 characters long and include a letter and a number.";
        default:
          return null;
      }
    }

    return null;
  };

  const validateAllFields = (data, type) => {
    const newErrors = {};
    for (const key in data) {
      newErrors[key] = validateField(key, data[key]);
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === null);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "login") {
      setLoginData({ ...loginData, [name]: value });
    } else if (type === "register") {
      setRegisterData({ ...registerData, [name]: value });
    }

    const errorMessage = validateField(name, value);
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields(loginData, "login")) {
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", loginData);

      localStorage.setItem("token", response.data.access_token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
      alert("Login successful");
      // navigate("/admin");
      window.location.href = "/admin";
    } catch (error) {
      alert("Invalid login credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateAllFields(registerData, "register")) {
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
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) => handleInputChange(e, "login")}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
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
              {errors.name && <p className="error-text">{errors.name}</p>}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) => handleInputChange(e, "register")}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => handleInputChange(e, "register")}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
              <button type="submit">Register</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
