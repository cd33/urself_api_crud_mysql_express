import db from "../config/database";
import {
  getUserQuery,
  getAllUsersQuery,
  updateUserQuery,
  deleteUserQuery,
  updateUserQueryWithoutPassword,
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
    let values = new Array();
    let query = updateUserQuery;
    if (data.password) {
      values.push(data.name, data.email, data.password, data.id);
    } else {
      values.push(data.name, data.email, data.id);
      query = updateUserQueryWithoutPassword;
    }
    console.log("values :>> ", values);
    db.query(query, values, (error: any, results: any) => {
      if (error) {
        return callBack(error);
      }
      if (!results.affectedRows) {
        return callBack();
      }
      return callBack(null, results);
    });
  },

  delete: (id: any, callBack: any) => {
    db.query(deleteUserQuery, [id], (error: any, results: any) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
};
