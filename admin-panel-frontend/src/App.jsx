// import React, { useState } from "react";
// import AddPost from "./components/AddPost";
// import PostList from "./components/PostList";
// import "./App.css";

// function App() {
//   const [refresh, setRefresh] = useState(false);

//   const handlePostAdded = () => {
//     setRefresh(!refresh);
//   };

//   return (
//     <div className="container">
//       <h1>Admin Panel</h1>
//       <AddPost onPostAdded={handlePostAdded} />
//       <PostList key={refresh} />
//     </div>
//   );
// }

// export default App;

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import AdminPanel from "./components/AdminPanel";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/admin" /> : <HomePage />}
      />
      <Route
        path="/admin"
        element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;

