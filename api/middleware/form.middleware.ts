import { NextFunction, Response } from "express";

export const isValidEmail = (req: any, res: Response, next: NextFunction) => {
  // Expression régulière pour valider le format d'une adresse e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      success: 0,
      message: "Email wrong format",
    });
  }
  next();
};

export const isValidPassword = (req: any, res: Response, next: NextFunction) => {
  // Minimum eight characters, at least one letter, one number and one special character
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      success: 0,
      message:
        "Password wrong format: Minimum eight characters, at least one letter, one number and one special character",
    });
  }
  next();
};

export const isValidPasswordUpdate = (req: any, res: Response, next: NextFunction) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (req.body.password && !passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      success: 0,
      message:
        "Password wrong format: Minimum eight characters, at least one letter, one number and one special character",
    });
  }
  next();
};

export const isValidName = (req: any, res: Response, next: NextFunction) => {
  // Minimum two characters and max 50
  const nameRegex = /^.{2,50}$/;
  if (!nameRegex.test(req.body.name)) {
    return res.status(400).json({
      success: 0,
      message: "Name wrong format: Minimum two characters and max 50",
    });
  }
  next();
};
