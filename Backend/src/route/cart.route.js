import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { addItemToCart, removeItemFromCart, getUserCart } from "../controller/cart.conrtoller.js";

const router = Router();

// Route to get the user's cart
router.route("/userCart").get(verifyToken, getUserCart);

// Route to add an item to the cart
router.route("/addToCart").post(verifyToken, addItemToCart);

// Route to remove an item from the cart
router.route("/removeFromCart").post(verifyToken, removeItemFromCart);

export default router;
