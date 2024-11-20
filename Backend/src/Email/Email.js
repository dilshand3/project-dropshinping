import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL, // Your email address
    pass: process.env.ADMIN_PASSWORD, // Your generated App Password
  },
});

export function sendStartupEmail() {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: 'dilshan72404@gmail.com',
    text: 'The server has started successfully!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}
