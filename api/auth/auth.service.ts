import db from "../config/database";
import { insertUserQuery, getUserQuery } from "./auth.queries";

export const AuthService = {
  create: (data: any, callBack: any) => {
    db.query(
      insertUserQuery,
      [data.name, data.email, data.password],
      (error: any, results: any) => {
        if (error) {
          return callBack(error, "Database connection error", null);
        }
        return callBack(null, null, results);
      }
    );
  },

  getUserByEmail: (email: any, callBack: any) => {
    db.query(getUserQuery, [email], (error: any, results: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
