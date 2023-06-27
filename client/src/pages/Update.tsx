import { updateUser } from "../api/user";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

const Update = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  const user = state?.user;
  const token = state?.token;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      password: null,
    },
  });

  const onSubmit = async (data: any) => {
    const id = user?.id;
    console.log("data :>> ", data);
    const { name, email, password } = data;
    const body = {
      id,
      name,
      email,
      password,
    };
    if (!password) {
      delete body.password;
    }
    const result = await updateUser(body, token);
    if (result.success) {
      toast.success(result.message);
      await delay(2000);
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <h1>
        Update {user?.name} profile with id {user?.id}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Name</p>
          <input
            type="text"
            {...register("name", {
              pattern: /^.{2,50}$/,
              required: true,
            })}
          />
        </label>
        {errors?.name && (
          <p className="error">
            Name wrong format: Minimum two characters and max 50
          </p>
        )}
        <label>
          <p>Email</p>
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
              pattern:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            })}
          />
        </label>
        {errors?.password && (
          <p className="error">
            Password wrong format: Minimum eight characters,
            <br />
            at least one letter, one number and one special character
          </p>
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Update;
