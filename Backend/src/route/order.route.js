import { Router } from "express";
import { isAdmin } from "../middleware/Admin.middleware.js";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { createOrder, getUserOrders, updateOrderStatus, getOrderDetails, cancelOrder, trackOrder, getPurchaseHistory, updateTrackingInfo } from "../controller/order.controller.js";

const router = Router();

router.route("/createOrder").post(verifyToken, createOrder);
router.route("/userOrders").get(verifyToken, getUserOrders);
router.route("/updateOrderStatus").post(verifyToken,isAdmin, updateOrderStatus);
router.route("/orderDetails").post(verifyToken, getOrderDetails);
router.route("/cancelOrder").post(verifyToken, cancelOrder);
router.route("/trackOrder").post(verifyToken, trackOrder);
router.route("/purchaseHistory").get(verifyToken, getPurchaseHistory);
router.route("/updateOrderTraction").post(verifyToken,isAdmin,updateTrackingInfo);

export default router;