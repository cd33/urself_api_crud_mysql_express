import { Router } from "express";
import { UserController } from "./user.controller";
import { isAdmin, jwtValidation } from "../middleware/auth.middleware";
import {
  isValidEmail,
  isValidPasswordUpdate,
  isValidName,
} from "../middleware/form.middleware";
import { isOwnedAccount } from "../middleware/user.middleware";
const router = Router();

router.get("/", jwtValidation, isAdmin, UserController.getUsers);
router.get(
  "/:id",
  jwtValidation,
  isOwnedAccount,
  UserController.getUserByUserId
);
router.patch(
  "/",
  [jwtValidation, isAdmin, isValidEmail, isValidPasswordUpdate, isValidName],
  UserController.updateUsers
);
router.patch(
  "/:id",
  [
    jwtValidation,
    isOwnedAccount,
    isValidEmail,
    isValidPasswordUpdate,
    isValidName,
  ],
  UserController.updateUsers
);
router.delete("/:id", jwtValidation, isOwnedAccount, UserController.deleteUser);

module.exports = router;
