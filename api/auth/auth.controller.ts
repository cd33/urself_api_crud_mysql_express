import { AuthService } from "./auth.service";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Request, Response } from 'express';

export type LoginData = {
  email: string;
  password: string;
}

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const AuthController = {
  login: (req: Request, res: Response) => {
    const body: LoginData = req.body;
    AuthService.getUserByEmail(body.email, (err: any, results: any) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.status(401).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        const isAdmin = results.role === 1 ? true : false;
        const token = sign({ id: results.id, isAdmin }, process.env.JWT_KEY!, {
          expiresIn: 3600,
        });
        return res.status(200).json({
          success: 1,
          message: "Login successfully",
          data: token,
        });
      } else {
        return res.status(401).json({
          success: 0,
          message: "Invalid email or password",
        });
      }
    });
  },

  register: (req: Request, res: Response) => {
    const body: RegisterData = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    AuthService.create(body, (err: any, message: string, results: any) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message,
        });
      }
      if (!results) {
        return res.status(400).json({
          success: 0,
          message: "Failed to create user",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "User Created",
      });
    });
  },
};
