// import React, { useState } from "react";
// import AddPost from "./AddPost";
// import PostList from "./PostList";
// import { useNavigate } from "react-router-dom";
// import "../AdminPanel.css";

// function AdminPanel() {
//   const [refresh, setRefresh] = useState(false);
//   const navigate = useNavigate();

//   const handlePostAdded = () => {
//     setRefresh(!refresh); // Trigger refresh for PostList
//   };

//   const handleLogout = () => {
//     console.log("Logging out..."); // Debug log
//     localStorage.removeItem("token"); // Clear token
//     navigate("/"); // Redirect to home page
//     window.location.reload(); // Force reload to clear cached state
//   };
  

//   return (
//     <div className="container">
//       <div className="admin-header">
//         <h1>Admin Panel</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <AddPost onPostAdded={handlePostAdded} />
//       <PostList key={refresh} />
//     </div>
//   );
// }

// export default AdminPanel;

import React, { useState, useEffect } from "react";
import AddPost from "./AddPost";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import "../AdminPanel.css";

function AdminPanel() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the JWT token is available in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // If no token, redirect to the home (login) page
    }
  }, [navigate]);

  const handlePostAdded = () => {
    setRefresh(!refresh); // Trigger refresh for PostList
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    window.location.href = "/";  // Redirect to home page (login page)
  };

  return (
    <div className="container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <AddPost onPostAdded={handlePostAdded} />
      <PostList key={refresh} />
    </div>
  );
}

export default AdminPanel;
