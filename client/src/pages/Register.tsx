import { registerUser } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = async (data: any) => {
    const { name, email, password, passwordConfirmation } = data;
    const token = await registerUser({
      name,
      email,
      password,
      passwordConfirmation,
    });
    if (token.success) {
      toast.success(token.message);
      await delay(2000);
      navigate("/");
    } else {
      toast.error(token.message);
    }
  };

  return (
    <>
      <h1>Please Register</h1>
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
              required: true,
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
        <label>
          <p>Password Confirmation</p>
          <input
            type="password"
            {...register("passwordConfirmation", {
              validate: (value) =>
                value === password || "Passwords don't match",
            })}
          />
        </label>
        {errors.passwordConfirmation && (
          <p className="error">
            {errors?.passwordConfirmation?.message?.toString()}
          </p>
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default Register;
