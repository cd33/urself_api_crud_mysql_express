import { NextFunction, Response } from "express";
import { isAdmin } from "./auth.middleware";

export const isOwnedAccount = (req: any, res: Response, next: NextFunction) => {
  if (req.isAdmin) {
    isAdmin(req, res, next);
    return next();
  }

  if (req.userId == req.params.id) {
    return next();
  } else {
    return res.json({
      success: 0,
      message: "Don't own this account",
    });
  }
};
