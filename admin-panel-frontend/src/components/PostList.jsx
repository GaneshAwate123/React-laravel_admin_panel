// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // function PostList() {
// //   const [posts, setPosts] = useState([]);

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   const fetchPosts = async () => {
// //     const response = await axios.get("http://127.0.0.1:8000/api/posts");
// //     setPosts(response.data);
// //   };

// //   return (
// //     <div>
// //       <h2>All Posts</h2>
// //       <ul>
// //         {posts.map((post) => (
// //           <li key={post.id}>
// //             <h3>{post.title}</h3>
// //             <p>{post.content}</p>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // export default PostList;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function PostList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://127.0.0.1:8000/api/posts", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setPosts(response.data);
//       } catch (error) {
//         alert("Error fetching posts");
//       }
//     };

//     fetchPosts();
//   }, []);

//   return (
//     <div>
//       <h2>Post List</h2>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h4>{post.title}</h4>
//             <p>{post.content}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PostList;

import React, { useState, useEffect } from "react";
import axios from "axios";

function PostList({ refreshKey }) {
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        alert("Error fetching posts");
      }
    };

    fetchPosts();
  }, [refreshKey]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Post deleted successfully!");
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      alert("Error deleting post");
    }
  };

  const handleEdit = (post) => {
    setEditPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:8000/api/posts/${editPostId}`,
        { title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post updated successfully!");
      setEditPostId(null);
      setPosts(
        posts.map((post) =>
          post.id === editPostId ? { ...post, title: editTitle, content: editContent } : post
        )
      );
    } catch (error) {
      alert("Error updating post");
    }
  };

  return (
    <div className="post-list post-list-container">
      <h2>Post List</h2>
      <table className="post-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              {editPostId === post.id ? (
                <>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    ></textarea>
                  </td>
                  <td>
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditPostId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{index + 1}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                  <td>
                    <button onClick={() => handleEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
