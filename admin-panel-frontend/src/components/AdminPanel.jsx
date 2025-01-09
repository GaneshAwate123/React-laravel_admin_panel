import React, { useState } from "react";
import AddPost from "./AddPost";
import PostList from "./PostList";
import { useNavigate } from "react-router-dom";
import "../AdminPanel.css";

function AdminPanel() {
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handlePostAdded = () => {
    setRefresh(!refresh); // Trigger refresh for PostList
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/login"); // Redirect to login
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
