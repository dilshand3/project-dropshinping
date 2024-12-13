import { Router } from "express";
import { upload } from "../middleware/multer.milddlware.js";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { createProduct, deleteProduct, productDetail, searchProduct, shareAllProduct, updateProductDetail, getTrendingProducts, getProductsByCategory } from "../controller/product.controller.js";
const router = Router();

router.route("/createProduct").post(upload.fields([{
    name: "ProductImage",
    maxCount: 1
}]), createProduct);
router.route("/deleteProduct").post(deleteProduct);
router.route("/productDetail").post(productDetail);
router.route("/allproduct").get(shareAllProduct)
router.route("/updateProduct").put(upload.fields([{
    name: "ProductImage",
    maxCount: 1
}]), updateProductDetail);
router.route("/searchproduct").post(searchProduct);
router.route("/trendingProduct").get(getTrendingProducts);
router.route("/getproductbyCategory").post(getProductsByCategory);

export default router;