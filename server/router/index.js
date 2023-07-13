import express from "express";
import UserController from "../controller/user.controller.js";

const router = express.Router();
router.post("/user/register",UserController.register);
export default router;