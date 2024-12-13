import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { addItemToCart, removeItemFromCart, getUserCart } from "../controller/cart.conrtoller.js";

const router = Router();

router.route("/userCart").get(verifyToken, getUserCart);
router.route("/addToCart").post(verifyToken, addItemToCart);
router.route("/removeFromCart").post(verifyToken, removeItemFromCart);

export default router;
