import { FC } from "react";
import { UserCredentials } from "../utils/interfaces";
import { useNavigate } from "react-router-dom";
import { deleteUserById } from "../api/user";
import { toast } from "react-toastify";

const User: FC<{ user: UserCredentials; token: string; getUser: any }> = ({
  user,
  token,
  getUser,
}) => {
  const navigate = useNavigate();
  const decoded = JSON.parse(atob(token.split(".")[1]));

  const handleDelete = async (id: any) => {
    const result = await deleteUserById(id, token);
    if (result.success) {
      if (decoded.isAdmin) {
        toast.success(result.message);
        getUser();
      } else {
        toast.info("See you soon !");
        localStorage.removeItem("token");
        window.location.reload();
      }
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div key={user.id}>
      <hr />
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <div className="userUD">
        <button
          className="buttonOrange"
          onClick={() => navigate("/update", { state: { user, token } })}
        >
          Update
        </button>
        <button className="buttonRed" onClick={() => handleDelete(user.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default User;
