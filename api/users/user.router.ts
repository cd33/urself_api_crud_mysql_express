import { isAdmin, jwtValidation } from "../middleware/auth.middleware";
import { UserController } from "./user.controller";
const router = require("express").Router();

router.get("/", jwtValidation, isAdmin, UserController.getUsers);
router.get("/:id", jwtValidation, UserController.getUserByUserId);
router.patch("/", jwtValidation, isAdmin, UserController.updateUsers);
router.delete("/", jwtValidation, isAdmin, UserController.deleteUser);

module.exports = router;
