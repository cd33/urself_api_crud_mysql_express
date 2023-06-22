const router = require("express").Router();
import { jwtValidation } from "../auth/jwtValidation";
import { UserController } from "./user.controller";
router.get("/", jwtValidation, UserController.getUsers);
router.get("/:id", jwtValidation, UserController.getUserByUserId);
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.patch("/", jwtValidation, UserController.updateUsers);
router.delete("/", jwtValidation, UserController.deleteUser);
// router.get("/", UserController.getUsers);
// router.post("/", UserController.createUser);
// router.get("/:id", UserController.getUserByUserId);
// router.post("/login", UserController.login);
// router.patch("/", UserController.updateUsers);
// router.delete("/", UserController.deleteUser);

module.exports = router;

// import express from "express";
// import { login, register } from "../controllers/authController";
// const router = express.Router();

// router.post("/login", login);
// router.post("/register", register);

// module.exports = router;
