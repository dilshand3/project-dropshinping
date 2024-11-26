import bcrypt from "bcryptjs"
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { sendVerificationEmail, sendPasswordVerificationEmail, sendUpdatedDetailEmail } from "../Email/Email.js";
import { generateTokenAndSetCookie } from "../utils/generateToken&setCokiee.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !password) {
        throw new Error("All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }]
    });

    if (existedUser && !existedUser.isVerified) {
        await User.deleteOne({ _id: existedUser._id });
    } else if (existedUser) {
        throw new Error("User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const VerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
        username,
        email,
        password: hashPassword,
        isAdmin,
        VerificationCode,
        VerificationCodeExpiry: Date.now() + 2 * 60 * 60 * 1000
    })

    await user.save();
    await sendVerificationEmail(user.email, VerificationCode, user.username);
    const createdUser = await User.findById(user._id).select("-password -VerificationCodeExpiry").lean().exec();

    res.status(200).json({ success: true, message: "User created successfully", data: createdUser })
});

const verifyUser = asyncHandler(async (req, res) => {
    const { code } = req.body;

    const user = await User.findOne({
        VerificationCode: code,
        VerificationCodeExpiry: { $gt: Date.now() }
    })

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Invalid or expired verification code",
            user
        })
    }

    user.isVerified = true;
    user.VerificationCode = undefined,
        user.VerificationCodeExpiry = undefined;
    generateTokenAndSetCookie(res, user._id);
    await user.save();
    res.status(200).json({
        success: true,
        message: "Email verified successfully",
        user: {
            ...user._doc,
            password: undefined,
        },
    });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        isVerified: true
    });
    if (!user) {
        return res.status(400).json({ success: false, message: "account hi nhi hai" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "ex name yaad hai password nhi" });
    }

    await generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: {
            ...user._doc,
            password: undefined,
        },
    });
});

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("LOGIN_TOKEN");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

const toggleAdmin = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const userStatus = await User.findOne({
        email: email
    });

    if (!userStatus) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    userStatus.isAdmin = !userStatus.isAdmin;
    await userStatus.save();

    res.status(200).json({ success: true, message: "User admin status toggled successfully" });
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
        email,
        isVerified: true
    });
    if (!user) {
        return res.status(400).json({ success: false, message: "account hi nhi hai" });
    }

    const ResetPasswordCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.ResetPasswordCode = ResetPasswordCode;
    user.ResetPasswordCodeExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    await user.save();

    await sendPasswordVerificationEmail(user.email, ResetPasswordCode, user.username);

    res.status(200).json({ success: true, message: "Reset code sent to email" });
});

const resetPassword = asyncHandler(async (req, res) => {
    const { resetCode, newPassword } = req.body;
    const user = await User.findOne({
        ResetPasswordCode: resetCode,
        ResetPasswordCodeExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired reset code" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.ResetPasswordCode = undefined;
    user.ResetPasswordCodeExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
});

const updateUserDetail = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body;
    const reqUser = req.userId; // Assuming the user ID is attached to the request object

    const user = await User.findById(reqUser);
    if (!user) {
        return res.status(400).json({ success: false, message: "User not found" });
    }

    if (username && username !== user.username) {
        user.username = username;
    }

    if (email && email !== user.email) {
        user.email = email;
        user.isVerified = false;
        const UpdateVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.UpdateVerificationCode = UpdateVerificationCode;
        user.UpdateVerificationCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
        await sendUpdatedDetailEmail(user.email, UpdateVerificationCode, user.username);
    }

    await user.save();
    res.status(200).json({ success: true, message: "Verification code sent to email" });
});

const verifyUpdate = asyncHandler(async (req, res) => {
    const { code } = req.body;
    const user = await User.findOne({
        UpdateVerificationCode: code,
        UpdateVerificationCodeExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
    }

    user.isVerified = true;
    user.UpdateVerificationCode = undefined;
    user.UpdateVerificationCodeExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Details updated successfully" });
});

const deleteUser = asyncHandler(async (req, res) => {
    const { Id } = req.body;
    try {
        await User.findByIdAndDelete(Id)
    } catch (error) {
        res.status(400).json({ succes: false, message: "can't delete user" })
    }
    res.status(200).json({ succes: true, message: "user deleted succes fully" })
});

const shareAllUser = asyncHandler(async (req, res) => {
    const allUser = await User.find();
    try {
        res.status(200).json({ success: true, message: "user send succesfully", data: allUser })
    } catch (error) {
        res.status(400).json({ success: false, message: "can't send user something went wrong while sending user" })
    }
})

const searchUserByUsername = asyncHandler(async (req, res) => {
    const { username } = req.body; 

    if (!username) {
        return res.status(400).json({ success: false, message: "Username is required" });
    }

    try {
        const users = await User.find({ username: new RegExp(username, 'i') }); 
        res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users" });
    }
});

export { registerUser, verifyUser, loginUser, logoutUser, toggleAdmin, forgotPassword, resetPassword, updateUserDetail, verifyUpdate, deleteUser, shareAllUser, searchUserByUsername }