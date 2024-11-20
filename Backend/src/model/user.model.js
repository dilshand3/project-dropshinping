import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String,
    },
    verifyTokenExpiry: {
        type: Date,
    }
})

export const User = mongoose.model("User", userSchema);
