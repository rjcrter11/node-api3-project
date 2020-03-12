import React from "react";

import { useHistory } from "react-router-dom";

const Users = (props) => {
  const history = useHistory();

  const routeToUser = (e, user) => {
    e.preventDefault();
    history.push(`/users/${user.id}/posts`);
  };

  return (
    <div>
      <h2>Users</h2>
      {props.users.map((user) => (
        <div
          onClick={(e) => routeToUser(e, user)}
          className="user-card"
          key={user.id}
        >
          <p> {user.name} </p>
        </div>
      ))}
    </div>
  );
};
export default Users;
