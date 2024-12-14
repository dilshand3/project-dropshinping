import { Cart } from "../model/cart.model.js";
import { asyncHandler } from "../utils/asynchandler.js";

const addItemToCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
        cart.items[itemIndex].quantity += Number(quantity);
    } else {
        cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Item added to cart", data: cart });
});

const removeItemFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ success: true, message: "Item removed from cart", data: cart });
});

const removeOneItemFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
        if (cart.items[itemIndex].quantity > 1) {
            cart.items[itemIndex].quantity -= 1;
        } else {
            cart.items.splice(itemIndex, 1);
        }
    } else {
        return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Item quantity decreased by one", data: cart });
});

const getUserCart = asyncHandler(async (req, res) => {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
        return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, message: "Cart retrieved successfully", data: cart });
});

export { addItemToCart, removeItemFromCart, getUserCart,removeOneItemFromCart };