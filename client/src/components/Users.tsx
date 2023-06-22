import { useState, useEffect } from "react";
import { User } from "../utils/interfaces";

const Users = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    let isMounted = true;


    setUsers([]);
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default Users;
