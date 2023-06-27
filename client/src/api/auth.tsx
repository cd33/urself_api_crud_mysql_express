import { LoginCredentials, RegisterCredentials } from "../utils/interfaces";

export async function loginUser(loginCredentials: LoginCredentials) {
  return fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginCredentials),
  }).then((data) => data.json());
}

export async function registerUser(registerCredentials: RegisterCredentials) {
  return fetch("http://localhost:4000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerCredentials),
  }).then((data) => data.json());
}
