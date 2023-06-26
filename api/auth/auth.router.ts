import { AuthController } from "./auth.controller";
import {
  checkDuplicateEmailAndPassword,
  isValidEmail,
  isValidPassword,
  isValidName,
} from "../middleware/auth.middleware";
const router = require("express").Router();

router.post("/login", AuthController.login);
router.post(
  "/register",
  [checkDuplicateEmailAndPassword, isValidEmail, isValidPassword, isValidName],
  AuthController.register
);

module.exports = router;
