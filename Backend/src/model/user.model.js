import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    },
    VerificationCode: {
        type: String,
    },
    VerificationCodeExpiry: {
        type: Date,
    },
    ResetPasswordCode: {
        type: String
    },
    ResetPasswordCodeExpiry: {
        type: Date
    },
    UpdateVerificationCode: {
        type: String,
    },
    UpdateVerificationCodeExpiry: {
        type: Date,
    }
});

export const User = mongoose.model("User", userSchema);
