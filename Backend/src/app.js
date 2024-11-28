import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
dotenv.config({
    path: "./.env"
})

const app = express()
app.use(express.json({limit : "16kb"}));
app.use(cookieParser())

//user router 
import userRouter from "./route/user.route.js";
app.use("/api",userRouter);

//product router
import productRouter from "./route/product.route.js";
app.use("/productApi",productRouter)

export { app }