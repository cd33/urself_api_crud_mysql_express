import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkDuplicateEmailAndPassword } from "../middleware/auth.middleware";
import {
  isValidEmail,
  isValidPassword,
  isValidName,
} from "../middleware/form.middleware";
const router = Router();

router.post("/login", AuthController.login);
router.post(
  "/register",
  [checkDuplicateEmailAndPassword, isValidEmail, isValidPassword, isValidName],
  AuthController.register
);

module.exports = router;
