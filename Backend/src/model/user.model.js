import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
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
    profileImage: {
        type: String,
    },
    gender: {
        type: String
    },
    age: {
        type: String
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
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    city: {
        type: String
    },
    zipCode: {
        type: String
    },
    address: {
        type: String
    },
    PhoneNumber1: {
        type: Number
    },
    PhoneNumber2: {
        type: Number
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    }
});

export const User = mongoose.model("User", userSchema);
