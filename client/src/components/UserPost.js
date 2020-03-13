import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialComment = {
  text: ""
};

const UserPost = () => {
  const [post, setPost] = useState([]);
  const [editing, setEditing] = useState(true);
  const [commentToEdit, setCommentToEdit] = useState(initialComment);

  const { id } = useParams();

  const fetchPost = () => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        console.log(res);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const editComment = (comment) => {
    setEditing(true);
    setCommentToEdit(comment);
  };

  const saveEdit = (e) => {
    console.log("ediiiititit");
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/posts/${id} `, commentToEdit)
      .then((res) => {
        console.log(res);
        fetchPost();
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="main-container">
      <div className="post-card">
        <h3> {post.text} </h3>
        {!editing && <span onClick={() => editComment(post)}>Edit</span>}
      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit post</legend>
          <label>
            Comment
            <input
              type="text"
              onChange={(e) => setCommentToEdit({ text: e.target.value })}
              value={commentToEdit.text}
            />
          </label>
          <div className="btn-row">
            <button type="submit"> Submit</button>
            <button onClick={() => setEditing(false)} type="button">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserPost;
