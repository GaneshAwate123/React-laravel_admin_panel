// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../PostPage.css";

// function PostPage() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("No token found. Please log in.");
//         }

//         const response = await axios.get("http://127.0.0.1:8000/api/posts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         alert(error.response?.data?.message || "Failed to fetch posts. Please log in again.");
//         if (error.response?.status === 401) {
//           window.location.href = "/"; // Redirect to login page if unauthorized
//         }
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div className="post-page-container">
//       <h1>Posts</h1>
//       <div className="post-grid">
//         {posts.map((post, index) => (
//           <div key={post.id} className="post-card">
//             <h3>{`${index + 1}. ${post.title}`}</h3>
//             <p>{post.content}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PostPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../PostPage.css";

function PostPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("http://127.0.0.1:8000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert(error.response?.data?.message || "Failed to fetch posts. Please log in again.");
        if (error.response?.status === 401) {
          window.location.href = "/"; // Redirect to login page if unauthorized
        }
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // Redirect to login page
  };

  return (

      <div className="post-page-container">
        {/* Header Section */}
        <header className="header">
          <div className="logo">My Blog</div>
          <nav className="nav-menu">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
          </nav>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </header>

        {/* Main Content */}
        <main className="main-content">
          <h1>Latest Posts</h1>
          <div className="post-grid">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <div key={post.id} className="post-card">
                  <h3>{`${index + 1}. ${post.title}`}</h3>
                  <p>{post.content}</p>
                </div>
              ))
            ) : (
              <p className="no-posts">No posts available.</p>
            )}
          </div>
        </main>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h2>What Our Readers Say</h2>
          <div className="testimonial-box">
            <p>"This blog is so informative! I love reading the latest posts."</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial-box">
            <p>"Great content and well-written articles. Highly recommended!"</p>
            <span>- Jane Smith</span>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="footer">
          <p>&copy; 2025 My Blog. All rights reserved.</p>
          <div className="social-icons">
            <a href="#">Facebook</a> | <a href="#">Twitter</a> | <a href="#">Instagram</a>
          </div>
        </footer>
      </div>

  );
}

export default PostPage;

