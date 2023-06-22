import db from "../config/database";

export const UserService = {
  create: (data: any, callBack: any) => {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [data.email],
      async (error, result) => {
        if (error) {
          return callBack(error, "Database connection error");
        }
        if (result.length > 0) {
          return callBack(true, "Email already exist"); // remplacer par une erreur quelconque non custom
        } else if (data.password !== data.passwordConfirmation) {
          return callBack(true, "Passwords don't match");
        }

        db.query(
          `insert into users(name, email, password) 
                values(?,?,?)`,
          [data.name, data.email, data.password],
          (error: any, results: any) => {
            if (error) {
              return callBack(error, "Database connection error");
            }
            return callBack(null, results);
          }
        );
      }
    );
  },

  getByEmail: (email: any, callBack: any) => {
    db.query(
      `select * from users where email = ?`,
      [email],
      (error: any, results: any) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getById: (id: any, callBack: any) => {
    db.query(
      `select id,name,email from users where id = ?`,
      [id],
      (error: any, results: any) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getAll: (callBack: any) => {
    db.query(
      `select id,name,email from users`,
      [],
      (error: any, results: any) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  update: (data: any, callBack: any) => {
    db.query(
      `update users set name=?, email=?, password=? where id = ?`,
      [data.name, data.email, data.password, data.id],
      (error: any, results: any) => {
        if (error) {
          return callBack(error);
        }
        if(!results.affectedRows) {
          return callBack();
        }
        return callBack(null, results);
      }
    );
  },

  delete: (data: any, callBack: any) => {
    db.query(
      `delete from users where id = ?`,
      [data.id],
      (error: any, results: any) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
};
