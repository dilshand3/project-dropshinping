import { asyncHandler } from "../utils/asynchandler.js";
import { Product } from "../model/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, detail, genderCategory, sessionalCategory, price, preBookingPrice } = req.body;
    if (!name || !description || !detail || !genderCategory || !sessionalCategory || !price || !preBookingPrice) {
        return res.status(400).json({ success: false, message: "all detail required" })
    };

    const ProductImageLocal = await req.files?.ProductImage?.[0]?.path;

    if (!ProductImageLocal) {
        throw new Error("Product is required")
    }
    const ProductImage = await uploadOnCloudinary(ProductImageLocal);
    if (!ProductImage) {
        return res.status(400).json({ success: false, message: "product Image didn't uploaded" })
    };

    const numericPrice = parseFloat(price);
    const numericPreBookingPrice = parseFloat(preBookingPrice);

    const SellingPrice = numericPrice + numericPreBookingPrice;

    const NewProduct = new Product({
        name,
        description,
        detail,
        genderCategory,
        sessionalCategory,
        ProductImage: ProductImage.url,
        price: numericPrice,
        preBookingPrice: numericPreBookingPrice,
        SellingPrice
    });

    const addedProduct = await NewProduct.save();
    res.status(200).json({ success: true, message: "product added successfully", data: addedProduct })
});

export { createProduct }