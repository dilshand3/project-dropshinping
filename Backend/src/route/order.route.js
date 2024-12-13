import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { createOrder, getUserOrders, updateOrderStatus } from "../controller/order.controller.js";

const router = Router();

// Route to create a new order
router.route("/createOrder").post(verifyToken, createOrder);

// Route to get all orders for a user
router.route("/userOrders").get(verifyToken, getUserOrders);

// Route to update order status
router.route("/updateOrderStatus").post(verifyToken, updateOrderStatus);

export default router;