import { UserService } from "./user.service";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const UserController = {
  createUser: (req: any, res: any) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    body.passwordConfirmation = hashSync(body.passwordConfirmation, salt);
    UserService.create(body, (err: any, message: string, results: any) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message,
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Failed to create user",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  login: (req: any, res: any) => {
    const body = req.body;
    UserService.getByEmail(body.email, (err: any, results: any) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY!, {
          expiresIn: "1h",
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password",
        });
      }
    });
  },

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
