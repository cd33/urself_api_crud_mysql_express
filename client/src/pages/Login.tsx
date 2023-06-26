import { FC } from "react";
import PropTypes from "prop-types";
import { loginUser } from "../api/auth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login: FC<{ setToken: any }> = ({ setToken }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const token = await loginUser({
      email,
      password,
    });
    if (token.success) {
      // toast.success(token.message);
      setToken(token.data);
      // navigate("/");
      window.location.reload();
    } else {
      toast.error(token.message);
    }
  };

  return (
    <>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Username</p>
          <input
            type="text"
            {...register("email", {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              required: true,
            })}
          />
        </label>
        {errors?.email && <p className="error">Email wrong format</p>}
        <label>
          <p>Password</p>
          <input
            type="password"
            {...register("password", {
              required: true,
            })}
          />
        </label>
        {errors?.password && <p className="error">Password is required</p>}
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
