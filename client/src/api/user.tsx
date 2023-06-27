import { User } from "../utils/interfaces";

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

export async function updateUser(user: User, token: string) {
  console.log('user :>> ', user);
  console.log('JSON.stringify(user) :>> ', JSON.stringify(user));
  // attendu : { id: '16', name: 'tata', email: 'tata@tata.tata' }
  
  // return fetch(`http://localhost:4000/api/users`, {
  //   method: "PATCH",
  //   headers: { authorization: `Bearer ${token}` },
  //   body: JSON.stringify(user),
  // }).then((data) => data.json());
}

export async function deleteUserById(id: string, token: string) {
  return fetch(`http://localhost:4000/api/users/${id}`, {
    method: "DELETE",
    headers: { authorization: `Bearer ${token}` },
  }).then((data) => data.json());
}
