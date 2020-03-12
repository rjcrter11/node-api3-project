import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialComment = {
  text: ""
};

const User = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [userPage, setUserPage] = useState([]);
  const [addComment, setAddComment] = useState(initialComment);
  const [editing, setEditing] = useState(false);
  const [commentToEdit, setCommentToEdit] = useState(initialComment);

  const { id } = useParams();

  const fetchUser = () => {
    axios
      .get(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        console.log(res);
        setUserPage(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchPosts = () => {
    axios
      .get(`http://localhost:5000/api/users/${id}/posts`)
      .then((res) => {
        console.log(res);
        setUserPosts(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchPosts();
    fetchUser();
  }, [commentToEdit]);
  const deletePost = (post) => {
    axios
      .delete(`http://localhost:5000/api/posts/${post.id}`)
      .then((res) => {
        console.log(res);
        fetchPosts();
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/users/${userPosts.id}/posts`, addComment)
      .then((res) => {
        console.log(res);
        setAddComment(initialComment);
        fetchPosts();
      })
      .catch((err) => console.log(err));
  };

  const editComment = (comment) => {
    setEditing(true);
    setCommentToEdit(comment);
  };

  const saveEdit = () => {
    console.log("ediiiititit");
    axios
      .put(`http://localhost:5000/api/posts/${id}`, commentToEdit)
      .then((res) => {
        console.log(res);
        fetchPosts();
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };
  console.log("log for userposts", userPosts);

  return (
    <div>
      <h3> Comments by {userPage.name} </h3>
      <div className="posts-container">
        {userPosts &&
          userPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3> {post.text} </h3>
              <p> posted by: {post.postedBy} </p>
              <span onClick={() => deletePost(post)} className="delete">
                {" "}
                x
              </span>
              <span onClick={() => editComment(post)}>Edit</span>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Comment</label>
        <input
          type="text"
          id="text"
          value={addComment.text}
          onChange={(e) => {
            setAddComment({
              text: e.target.value
            });
          }}
        />
        <button type="submit">Submit</button>
      </form>

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
          <button type="submit"> Submit</button>
        </form>
      )}
    </div>
  );
};

export default User;
