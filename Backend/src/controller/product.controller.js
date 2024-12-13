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

const deleteProduct = asyncHandler(async (req, res) => {
    const { Id } = req.body;
    try {
        await Product.findByIdAndDelete(Id);
        res.status(200).json({ success: true, message: "product deleted succesfully" })
    } catch (error) {
        return res.status(400).json({ success: false, message: "product can't deleted" })
    }
});

const productDetail = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ success: false, message: "product not found" })
    }
    res.status(200).json({ success: true, message: "product detail fetched successfully", data: product })
});

const updateProductDetail = asyncHandler(async (req, res) => {
    const { id, name, description, detail, genderCategory, sessionalCategory, price, preBookingPrice, onSell, onSellDate, category, subCategory } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const product = await Product.findById(id);
    if (!product) {
        return res.status(400).json({ success: false, message: "Product not found" });
    }

    // Handle image upload if present
    if (req.files?.ProductImage?.[0]?.path) {
        try {
            const uploadedImage = await uploadOnCloudinary(req.files.ProductImage[0].path);
            product.ProductImage = uploadedImage.url;
        } catch (error) {
            return res.status(400).json({ success: false, message: "Failed to upload product image" });
        }
    }

    // Convert price fields to numbers if provided
    let numericPrice = price ? parseFloat(price) : product.price;
    let numericPreBookingPrice = preBookingPrice ? parseFloat(preBookingPrice) : product.preBookingPrice;

    // Validate if the converted prices are valid numbers
    if (price && isNaN(numericPrice)) {
        return res.status(400).json({ success: false, message: "Invalid price format" });
    }
    if (preBookingPrice && isNaN(numericPreBookingPrice)) {
        return res.status(400).json({ success: false, message: "Invalid pre-booking price format" });
    }

    // Calculate new selling price if either price is updated
    const newSellingPrice = numericPrice + numericPreBookingPrice;

    // Update only provided fields
    const updates = {
        name,
        description,
        detail,
        genderCategory,
        sessionalCategory,
        price: numericPrice,
        preBookingPrice: numericPreBookingPrice,
        SellingPrice: newSellingPrice,
        onSell,
        onSellDate,
        category,
        subCategory
    };

    Object.keys(updates).forEach((key) => {
        if (updates[key] !== undefined) {
            product[key] = updates[key];
        }
    });

    const updatedProduct = await product.save();
    if (!updatedProduct) {
        return res.status(400).json({ success: false, message: "Product update failed" });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });
});

const shareAllProduct = asyncHandler(async (req, res) => {
    const product = await Product.find();
    if (!product) {
        return res.status(400).json({ success: false, message: "product not found" })
    }
    res.status(200).json({ success: true, message: "product fetched successfully", data: product })
});

const searchProduct = asyncHandler(async(req,res) => {
    const {name} = req.body;
    const product = await Product.find({name:{$regex:name,$options:"i"}});
    if (!product) {
        return res.status(400).json({ success: false, message: "product not found" })
    }
    res.status(200).json({ success: true, message: "product fetched successfully", data: product })
})

const getTrendingProducts = asyncHandler(async (req, res) => {
    try {
        const trendingProducts = await Product.find().sort({ salesCount: -1 }).limit(10);
        res.status(200).json({ success: true, message: "Trending products fetched successfully", data: trendingProducts });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to fetch trending products" });
    }
});

const getProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.body; // Assuming category is passed as a URL parameter
    try {
        const products = await Product.find({ category });
        if (!products.length) {
            return res.status(404).json({ success: false, message: "No products found in this category" });
        }
        res.status(200).json({ success: true, message: "Products fetched successfully", data: products });
    } catch (error) {
        res.status(400).json({ success: false, message: "Failed to fetch products by category" });
    }
});

export { createProduct, deleteProduct, productDetail, updateProductDetail, shareAllProduct, searchProduct, getTrendingProducts, getProductsByCategory }