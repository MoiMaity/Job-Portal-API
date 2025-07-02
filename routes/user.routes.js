import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.get("/register", userController.getRegister);
router.post("/register", userController.addUser);
router.get("/login", userController.getLogin);
router.post("/login", userController.loginUser);
router.get("/logout", userController.logoutUser);

export default router;
