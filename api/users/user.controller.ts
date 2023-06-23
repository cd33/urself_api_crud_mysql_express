import { UserService } from "./user.service";
import { hashSync, genSaltSync } from "bcryptjs";

export const UserController = {
  getUserByUserId: (req: any, res: any) => {
    const id = req.params.id;
    UserService.getById(id, (err: any, results: any) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Record not Found",
        });
      }
      results.password = undefined;
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req: any, res: any) => {
    UserService.getAll((err: any, results: any) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to get users",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUsers: (req: any, res: any) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    UserService.update(body, (err: any, results: any) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to update user",
        });
      }
      console.log('results :>> ', results);
      return res.json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },

  deleteUser: (req: any, res: any) => {
    const data = req.body;
    UserService.delete(data, (err: any, results: any) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failed to delete user",
        });
      }
      return res.json({
        success: 1,
        message: "User deleted successfully",
      });
    });
  },
};
