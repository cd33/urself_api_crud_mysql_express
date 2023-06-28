import { FC, useEffect, useState, useCallback } from "react";
import { getAllUsers, getUserById } from "../api/user";
import { UserCredentials } from "../utils/interfaces";
import User from "../components/User";

const Dashboard: FC<{ token: any }> = ({ token }) => {
  const [users, setUsers] = useState<UserCredentials[] | null>([]);
  const decoded = JSON.parse(atob(token.split(".")[1]));

  const getUser = useCallback(async () => {
    if (!decoded.isAdmin) {
      const result = await getUserById(decoded.id, token);
      if (result.success) {
        setUsers([result.data]);
      } else {
        result.message && console.log("Server problem :>> ", result.message);
      }
    } else {
      const result = await getAllUsers(token);
      if (result.success) {
        setUsers(result.data);
      } else {
        result.message && console.log("Server problem :>> ", result.message);
      }
    }
  }, [decoded, token]);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  return (
    <div>
      {users ? (
        <>
          <h1 style={{ textAlign: "center" }}>
            {users.length > 1 ? "All Profiles" : "My Profile"}
          </h1>
          {users &&
            users.map((user) => (
              <User key={user.id} user={user} token={token} getUser={getUser} />
            ))}
        </>
      ) : (
        <h1 className="textRed">
          Server problem: unable to retrieve user info
        </h1>
      )}
    </div>
  );
};

export default Dashboard;
