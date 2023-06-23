import db from "../config/database";
import {
  getUserQuery,
  getAllUsersQuery,
  updateUserQuery,
  deleteUserQuery,
} from "./user.queries";

export const UserService = {
  getById: (id: any, callBack: any) => {
    db.query(getUserQuery, [id], (error: any, results: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },

  getAll: (callBack: any) => {
    db.query(getAllUsersQuery, [], (error: any, results: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  update: (data: any, callBack: any) => {
    db.query(
      updateUserQuery,
      [data.name, data.email, data.password, data.id],
      (error: any, results: any) => {
        if (error) {
          return callBack(error);
        }
        if (!results.affectedRows) {
          return callBack();
        }
        return callBack(null, results);
      }
    );
  },

  delete: (data: any, callBack: any) => {
    db.query(deleteUserQuery, [data.id], (error: any, results: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
};
