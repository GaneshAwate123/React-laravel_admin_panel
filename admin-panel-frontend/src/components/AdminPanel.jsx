// import React, { useState, useEffect } from "react";
// import AddPost from "./AddPost";
// import PostList from "./PostList";
// import { useNavigate } from "react-router-dom";
// import "../AdminPanel.css";

// function AdminPanel() {
//   const [isAddPostVisible, setIsAddPostVisible] = useState(false);
//   const [refresh, setRefresh] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/"); // Redirect to login if not authenticated
//     }
//   }, [navigate]);

//   const handleToggleAddPost = () => {
//     setIsAddPostVisible(!isAddPostVisible); // Show/Hide Add Post form
//   };

//   const handlePostUpdated = () => {
//     setRefresh(!refresh); // Trigger refresh for PostList
//     setIsAddPostVisible(false); // Close Add Post form after adding
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <div className="container">
//       <div className="admin-header">
//         <h1>Admin Panel</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <button className="add-post-btn" onClick={handleToggleAddPost}>
//         {isAddPostVisible ? "Cancel" : "Add Post"}
//       </button>
//       {isAddPostVisible && <AddPost onPostAdded={handlePostUpdated} />}
//       <PostList refreshKey={refresh} />
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
  const [isAddPostVisible, setIsAddPostVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleToggleAddPost = () => {
    setIsAddPostVisible(!isAddPostVisible);
  };

  const handlePostUpdated = () => {
    setRefresh(!refresh);
    setIsAddPostVisible(false); // Close Add Post form after adding
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h2>Dashboard</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
        <button onClick={() => window.location.href = "/postsPage"}>View Posts Page</button>
      </header>
      <div className="content">
        <div className="add-post-section">
          <button className="toggle-btn" onClick={handleToggleAddPost}>
            {isAddPostVisible ? "Cancel" : "Add Post"}
          </button>
          {isAddPostVisible && <AddPost onPostAdded={handlePostUpdated} />}
        </div>
        <PostList refreshKey={refresh} />
      </div>
    </div>
  );
}

export default AdminPanel;
