import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Users from "./components/Users";
import User from "./components/User";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="App">
      <Route exact path="/users">
        <Users users={users} />
      </Route>
      <Route exact path="/users/:id/posts">
        <User users={users} setUsers={setUsers} />
      </Route>
    </div>
  );
}

export default App;
