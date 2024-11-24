import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { registerUser,verifyUser,loginUser, logoutUser, toggleAdmin,forgotPassword,resetPassword,updateUserDetail } from "../controller/user.controller.js";

const router = Router();
router.route("/signup").post(registerUser);
router.route("/verifyuser").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/setrole").post(toggleAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").post(resetPassword);
router.route("/profilereq").post(verifyToken,updateUserDetail)

export default router;