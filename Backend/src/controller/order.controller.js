import { Order } from "../model/order.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Cart } from "../model/cart.model.js";

const createOrder = asyncHandler(async (req, res) => {
    const { items, totalAmount,price } = req.body;
    const userId = req.userId;

    const order = new Order({
        userId,
        items,
        totalAmount
    });

    await order.save();

    await Cart.deleteMany({ userId });

    res.status(201).json({ success: true, message: "Order created successfully", data: order });
});

const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const orders = await Order.find({ userId }).populate("items.productId");

    res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
});


const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, message: "Order status updated successfully", data: order });
});

const getOrderDetails = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate("items.productId");

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order details retrieved successfully", data: order });
});

const cancelOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.status === "Completed") {
        return res.status(400).json({ success: false, message: "Cannot cancel a completed order" });
    }

    order.status = "Cancelled";
    await order.save();

    res.status(200).json({ success: true, message: "Order cancelled successfully", data: order });
});

const trackOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Tracking information retrieved successfully", data: order.trackingInfo });
});

const getPurchaseHistory = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const orders = await Order.find({ userId, status: "Completed" }).populate("items.productId");

    if (!orders) {
        return res.status(200).json({success: true,message:"No completed product purchasing"})
    }

    res.status(200).json({ success: true, message: "Purchase history retrieved successfully", data: orders });
});

const updateTrackingInfo = asyncHandler(async (req, res) => {
    const { orderId, trackingInfo } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.trackingInfo = trackingInfo;
    await order.save();

    res.status(200).json({ success: true, message: "Tracking information updated successfully", data: order });
});

export { createOrder, getUserOrders, updateOrderStatus, getOrderDetails, cancelOrder, trackOrder, getPurchaseHistory, updateTrackingInfo };