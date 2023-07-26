import express from "express";
import UserController from "../controller/user.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.post("/user/register",UserController.register);
router.post("/user/login",UserController.login);
router.put("/user/forget",UserController.forgerPassword);
router.put("/user/updateProfile/:userId",auth,UserController.updateProfile);
router.put("/user/updateProfileImage/:userId",auth,UserController.updateProfileImage);
export default router;