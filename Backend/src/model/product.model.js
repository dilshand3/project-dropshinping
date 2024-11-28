import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
    },
    ProductImage: {
        type: String
    },
    genderCategory: {
        type: String,
        required: true
    },
    sessionalCategory: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    preBookingPrice: {
        type: Number,
    },
    SellingPrice: {
        type: Number
    },
    onSell : {
        type : Boolean,
        default : false
    },
    onSellDate : {
        type : Date,
    },
    
    category: {
        type: String,
    },
    subCategory: {
        type: String,
    }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema)