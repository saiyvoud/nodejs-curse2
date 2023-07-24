import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();
router.post("/user/register",UserController.register);
router.post("/user/login",UserController.login);
export default router;