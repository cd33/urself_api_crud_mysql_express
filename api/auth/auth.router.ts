import { AuthController } from "./auth.controller";
import { checkDuplicateEmailAndPassword, isValidEmail } from "../middleware/auth.middleware";
const router = require("express").Router();

router.post("/login", AuthController.login);
router.post(
  "/register",
  [checkDuplicateEmailAndPassword, isValidEmail],
  AuthController.register
);

module.exports = router;
