export const getUserQuery = `SELECT id, name, email, role FROM users WHERE id = ?`;
export const getAllUsersQuery = `SELECT id, name, email FROM users`;
export const updateUserQuery = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
export const deleteUserQuery = `DELETE FROM users WHERE id = ?`;