// // import React, { useState } from "react";
// // import AddPost from "./components/AddPost";
// // import PostList from "./components/PostList";
// // import "./App.css";

// // function App() {
// //   const [refresh, setRefresh] = useState(false);

// //   const handlePostAdded = () => {
// //     setRefresh(!refresh);
// //   };

// //   return (
// //     <div className="container">
// //       <h1>Admin Panel</h1>
// //       <AddPost onPostAdded={handlePostAdded} />
// //       <PostList key={refresh} />
// //     </div>
// //   );
// // }

// // export default App;

// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import HomePage from "./components/HomePage";
// import AdminPanel from "./components/AdminPanel";
// import "./App.css";

// function App() {
//   const isAuthenticated = !!localStorage.getItem("token");

//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={isAuthenticated ? <Navigate to="/admin" /> : <HomePage />}
//       />
//       <Route
//         path="/admin"
//         element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />}
//       />
//     </Routes>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import AdminPanel from "./components/AdminPanel";
import ForgotPassword from "./components/ForgotPassword"
import "./App.css";

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Effect hook to listen for changes in localStorage (e.g., on login or logout)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Update authentication status based on token
  }, []);

  return (
    <Routes>
      {/* If authenticated, redirect to /admin */}
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/admin" /> : <HomePage setIsAuthenticated={setIsAuthenticated} />}
      />
      {/* If not authenticated, redirect to home page */}
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminPanel setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />//

    </Routes>
  );
}

export default App;
