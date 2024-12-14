import { Router } from "express";
import { upload } from "../middleware/multer.milddlware.js";
import { verifyToken } from "../middleware/VerifyToken.middleware.js";
import { createProduct, deleteProduct, productDetail, searchProduct, shareAllProduct, updateProductDetail, getTrendingProducts, getProductsByCategory } from "../controller/product.controller.js";
import { isAdmin } from "../middleware/Admin.middleware.js";
const router = Router();

router.route("/createProduct").post(upload.fields([{
    name: "ProductImage",
    maxCount: 1
}]), createProduct);
router.route("/deleteProduct").post(verifyToken,isAdmin,deleteProduct);
router.route("/productDetail").post(productDetail);
router.route("/allproduct").get(shareAllProduct)
router.route("/updateProduct").put(verifyToken,isAdmin,upload.fields([{
    name: "ProductImage",
    maxCount: 1
}]), updateProductDetail);
router.route("/searchproduct").post(searchProduct);
router.route("/trendingProduct").get(getTrendingProducts);
router.route("/getproductbyCategory").post(getProductsByCategory);

export default router;