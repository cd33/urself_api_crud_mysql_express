import { Request } from "express";
import { UserService } from "./user.service";
import { hashSync, genSaltSync } from "bcryptjs";
import { Response } from "express";

export type UpdateUserData = {
  id: number;
  name: string;
  email: string;
} & Partial<{
  password: string;
}>

export const UserController = {
  getUserByUserId: (req: Request, res: Response) => {
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

  getUsers: (req: Request, res: Response) => {
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

  updateUsers: (req: Request, res: Response) => {
    const body: UpdateUserData = req.body;

    if (body.password) {
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
    }
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
      return res.json({
        success: 1,
        message: "Updated successfully",
      });
    });
  },

  deleteUser: (req: Request, res: Response) => {
    const id = req.params.id;
    UserService.delete(id, (err: any, results: any) => {
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
