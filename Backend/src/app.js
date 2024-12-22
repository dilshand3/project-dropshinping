import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors"
dotenv.config({
    path: "./.env"
})

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//user router 
import userRouter from "./route/user.route.js";
app.use("/api", userRouter);

//product router
import productRouter from "./route/product.route.js";
app.use("/productApi", productRouter);

//cart route
import cartRouter from "./route/cart.route.js";
app.use("/cartApi", cartRouter);

//order route
import orderRouter from "./route/order.route.js";
app.use("/orderApi", orderRouter);

//Mega orderAds route
import megaAdsRouter from "./route/MegaAds.route.js";
app.use("/megaAdsApi", megaAdsRouter);

// payment route
import paymentRouter from "./route/payment.route.js";
app.use("/paymentApi", paymentRouter);

export { app }