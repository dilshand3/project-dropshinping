import { Router } from "express";
import { isAdmin } from "../middleware/Admin.middleware.js";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { createOrder, getUserOrders, updateOrderStatus } from "../controller/order.controller.js";

const router = Router();

router.route("/createOrder").post(verifyToken, createOrder);
router.route("/userOrders").get(verifyToken, getUserOrders);
router.route("/updateOrderStatus").post(verifyToken,isAdmin, updateOrderStatus);

export default router;