import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.get("/register", userController.getRegister.bind(userController));
router.post("/register", userController.addUser.bind(userController));
router.get("/login", userController.getLogin.bind(userController));
router.post("/login", userController.loginUser.bind(userController));
router.get("/logout", userController.logoutUser.bind(userController));

export default router;