export const checkUserQuery = `SELECT email FROM users WHERE email = ?`;
export const insertUserQuery = `INSERT INTO users (name, email, password) VALUES (?,?,?)`;
export const getUserQuery = `SELECT * FROM users WHERE email = ?`;

export const getRolesQuery = `SELECT * FROM roles`;
