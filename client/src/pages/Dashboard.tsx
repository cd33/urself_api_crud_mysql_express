import { FC, useEffect, useState, useCallback } from "react";
import { deleteUserById, getAllUsers, getUserById } from "../api/user";
import { User } from "../utils/interfaces";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard: FC<{ token: any }> = ({ token }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[] | null>([]);

  const getUser = useCallback(async () => {
    const decoded = JSON.parse(atob(token.split(".")[1]));
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
  }, [token]);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, getUser]);

  const handleDelete = async (id: any) => {
    const result = await deleteUserById(id, token);
    if (result.success) {
      toast.success(result.message);
      getUser();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div>
      {users ? (
        <>
          <h1 style={{ textAlign: "center" }}>
            {users.length > 1 ? "All Profiles" : "My Profile"}
          </h1>
          {users &&
            users.map((user) => (
              <div key={user.id}>
                <hr />
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <div className="userUD">
                  <button
                    className="buttonOrange"
                    onClick={() =>
                      navigate("/update", { state: { user, token } })
                    }
                  >
                    Update
                  </button>
                  <button
                    className="buttonRed"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
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
