import { FormEvent, useState } from "react";
import { registerUser } from "../api/auth";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const token = await registerUser({
      name,
      email,
      password,
      passwordConfirmation,
    });
    if (token.message) {
      setMessage(token.message);
    } else if (token.error) {
      setError(token.error);
    }
  };

  return (
    <>
      <h1>Please Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Email</p>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <p>Password Confirmation</p>
          <input
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <p style={{ color: "green" }}>{message}</p>
      )}
    </>
  );
};

export default Register;
