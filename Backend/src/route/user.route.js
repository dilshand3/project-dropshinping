import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { registerUser, verifyUser, loginUser, logoutUser, toggleAdmin, forgotPassword, resetPassword, updateUserDetail, verifyUpdate, deleteUser, shareAllUser, searchUserByUsername, completeProfile, addAddress, checkUser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.milddlware.js";
import { isAdmin } from "../middleware/Admin.middleware.js";

const router = Router();
router.route("/checkuser").get(verifyToken, checkUser);
router.route("/signup").post(registerUser);
router.route("/verifyuser").post(verifyUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/setrole").post(verifyToken,isAdmin,toggleAdmin);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").post(resetPassword);
router.route("/profilereq").post(verifyToken, updateUserDetail);
router.route("/verifyupdate").post(verifyUpdate);
router.route("/deleteuser").post(verifyToken,isAdmin,deleteUser);
router.route("/shareuser").get(verifyToken,isAdmin,shareAllUser);
router.route("/searchuser").post(verifyToken,isAdmin,searchUserByUsername);
router.route("/profilecomplete").post(
    verifyToken,
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    completeProfile
);
router.route("/addAdress").post(verifyToken,addAddress)

export default router;