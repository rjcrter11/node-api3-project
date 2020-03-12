import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const User = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userPage, setUserPage] = useState([]);

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
  }, []);

  return (
    <div>
      <h3> Comments by {userPage.name} </h3>
      <div className="posts-container">
        {userPosts &&
          userPosts.map((post) => (
            <div key={post.id} className="post-card">
              <h3> {post.text} </h3>
              <p> posted by: {post.postedBy} </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default User;
