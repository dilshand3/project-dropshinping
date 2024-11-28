import { Router } from "express";
import { upload } from "../middleware/multer.milddlware.js";
import { createProduct, deleteProduct } from "../controller/product.controller.js";
const router = Router();

router.route("/createProduct").post(upload.fields([{
    name: "ProductImage",
    maxCount: 1
}]), createProduct);
router.route("/deleteProduct").post(deleteProduct);

export default router;