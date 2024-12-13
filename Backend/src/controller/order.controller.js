import { Order } from "../model/order.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Cart } from "../model/cart.model.js";

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
    const { items, totalAmount } = req.body;
    const userId = req.userId;

    const order = new Order({
        userId,
        items,
        totalAmount
    });

    await order.save();

    // Clear the user's cart after order is created
    await Cart.deleteMany({ userId });

    res.status(201).json({ success: true, message: "Order created successfully", data: order });
});

// Get all orders for a user
const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const orders = await Order.find({ userId }).populate("items.productId");

    res.status(200).json({ success: true, message: "Orders retrieved successfully", data: orders });
});

// Update order status
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

export { createOrder, getUserOrders, updateOrderStatus };