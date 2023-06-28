import jwt from "jsonwebtoken";
import db from "../config/database";
import { UserService } from "../users/user.service";
import { checkUserQuery, getRolesQuery } from "../auth/auth.queries";
import { Response, NextFunction } from "express";

export const jwtValidation = (req: any, res: Response, next: NextFunction) => {
  let token = req.get("authorization");

  if (!token) {
    return res.status(403).send({
      success: 0,
      message: "Access denied: no token provided",
    });
  }

  token = token.slice(7); // Remove Bearer from string
  jwt.verify(token, process.env.JWT_KEY!, (err: any, decoded: any) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).send({
          success: 0,
          message: "Unauthorized! Access Token was expired!",
        });
      }

      return res.status(401).json({
        success: 0,
        message: "Invalid token",
      });
    } else {
      req.userId = decoded.id;
      req.isAdmin = decoded.isAdmin;
      next();
    }
  });
};

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    return res.status(403).send({
      success: 0,
      message: "Require Admin Role!",
    });
  }

  UserService.getById(req.userId, (err: any, results: any) => {
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

    db.query(getRolesQuery, [], async (error, result) => {
      if (error) {
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      const adminId = result.filter((r: any) => r.name === "admin");
      if (adminId[0].id !== results.role) {
        return res.status(403).send({
          success: 0,
          message: "Require Admin Role!",
        });
      }
      next();
    });
  });
};

export const checkDuplicateEmailAndPassword = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  db.query(checkUserQuery, [req.body.email], async (error, result) => {
    if (error) {
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    if (result.length > 0) {
      // remplacer par une erreur quelconque non custom
      return res.status(400).json({
        success: 0,
        message: "Email already exist",
      });
    } else if (req.body.password !== req.body.passwordConfirmation) {
      return res.status(400).json({
        success: 0,
        message: "Passwords don't match",
      });
    }
    next();
  });
};
