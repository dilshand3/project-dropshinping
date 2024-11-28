import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { registerUser, verifyUser, loginUser, logoutUser, toggleAdmin, forgotPassword, resetPassword, updateUserDetail, verifyUpdate, deleteUser, shareAllUser, searchUserByUsername, completeProfile } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.milddlware.js";

const router = Router();
router.route("/signup").post(registerUser);
router.route("/verifyuser").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/setrole").post(toggleAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").post(resetPassword);
router.route("/profilereq").post(verifyToken, updateUserDetail);
router.route("/verifyupdate").post(verifyUpdate);
router.route("/deleteuser").post(deleteUser);
router.route("/shareuser").get(shareAllUser);
router.route("/searchuser").post(searchUserByUsername);
router.route("/profilecomplete").post(
    verifyToken,
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    completeProfile
);

export default router;