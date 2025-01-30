// import React, { useState } from "react";
// import axios from "axios";

// function AddPost({ onPostAdded }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://127.0.0.1:8000/api/posts", { title, content });
//     onPostAdded(); // Refresh the post list
//     setTitle("");
//     setContent("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add New Post</h2>
//       <input
//         type="text"
//         placeholder="Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <textarea
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         required
//       ></textarea>
//       <button type="submit">Add Post</button>
//     </form>
//   );
// }

// export default AddPost;

import React, { useState } from "react";
import axios from "axios";

function AddPost({ onPostAdded }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://127.0.0.1:8000/api/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onPostAdded(); // Notify parent to refresh the list
      setTitle("");
      setContent("");
      alert("Post added successfully!");
    } catch (error) {
      alert("Error adding post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-post-form">
      <h2>Add New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default AddPost;
