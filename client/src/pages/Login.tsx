import { FC, FormEvent, useState } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../api/auth";

const Login: FC<{ setToken: any }> = ({ setToken }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    console.log("token :>> ", token);
    setToken(token);
  };

  return (
    <>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
