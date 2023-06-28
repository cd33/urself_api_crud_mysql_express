import { UserCredentials } from "../utils/interfaces";

export async function getUserById(id: string, token: string) {
  return fetch(`http://localhost:4000/api/users/${id}`, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  }).then((data) => data.json());
}

export async function getAllUsers(token: string) {
  return fetch(`http://localhost:4000/api/users`, {
    method: "GET",
    headers: { authorization: `Bearer ${token}` },
  }).then((data) => data.json());
}

export async function updateUser(user: UserCredentials, token: string) {
  const decoded = JSON.parse(atob(token.split(".")[1]));
  let url = "http://localhost:4000/api/users";
  if (!decoded.isAdmin) {
    url = `http://localhost:4000/api/users/${user.id}`;
  }
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  }).then((data) => data.json());
}

export async function deleteUserById(id: string, token: string) {
  return fetch(`http://localhost:4000/api/users/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then((data) => data.json());
}
