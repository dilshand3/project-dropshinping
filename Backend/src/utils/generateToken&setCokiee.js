import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = async (res, userId) => {
    const LOGIN_TOKEN = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
    await res.cookie("LOGIN_TOKEN", LOGIN_TOKEN, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    return LOGIN_TOKEN;
}