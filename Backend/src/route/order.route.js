import { Router } from "express";
import { isAdmin } from "../middleware/Admin.middleware.js";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { createOrder, getUserOrders, updateOrderStatus, getOrderDetails, cancelOrder, trackOrder, getPurchaseHistory } from "../controller/order.controller.js";

const router = Router();

router.route("/createOrder").post(verifyToken, createOrder);
router.route("/userOrders").get(verifyToken, getUserOrders);
router.route("/updateOrderStatus").post(verifyToken,isAdmin, updateOrderStatus);
router.route("/orderDetails/:orderId").get(verifyToken, getOrderDetails);
router.route("/cancelOrder").post(verifyToken, cancelOrder);
router.route("/trackOrder/:orderId").get(verifyToken, trackOrder);
router.route("/purchaseHistory").get(verifyToken, getPurchaseHistory);

export default router;