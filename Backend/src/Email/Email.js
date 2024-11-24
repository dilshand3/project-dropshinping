import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_VERIFICATION_TEMPLATE, UPDATEDDETAIL_TEMPLTATE } from "./EmailTemplate.js";

dotenv.config({
    path: "../.env"
});

export const sendVerificationEmail = async (email, VerificationCode, username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Email verification',
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{{VERIFICATION_CODE}}', VerificationCode).replace('{{username}}', username),
            replyTo: 'no-reply@example.com'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log("Something went wrong while sending email", error);
        throw new Error(error)
    }
}


export const sendPasswordVerificationEmail = async (email, ResetPasswordCode, username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Email verification',
            html: PASSWORD_VERIFICATION_TEMPLATE.replace('{{VERIFICATION_CODE}}', ResetPasswordCode).replace('{{username}}', username),
            replyTo: 'no-reply@example.com'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log("Something went wrong while sending email", error);
        throw new Error(error)
    }
}

export const sendUpdatedDetailEmail = async ( username) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: 'Email verification',
            html: UPDATEDDETAIL_TEMPLTATE.replace('{{username}}', username),
            replyTo: 'no-reply@example.com'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    } catch (error) {
        console.log("Something went wrong while sending email", error);
        throw new Error(error)
    }
}