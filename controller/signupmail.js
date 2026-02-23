import nodemailer from 'nodemailer';

import dotenv from 'dotenv';

// Load .env variables
dotenv.config();
// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // .env se email
    pass: process.env.EMAIL_PASS,  // .env se app password
  },
});

// Function to send welcome email
export async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to 360! 🎉',
    html: `
      <h2>Hi ${name},</h2>
      <p>Welcome to <strong>360 Family</strong>! We're excited to have you on board.</p>
      <p>Here’s what you can do next:</p>
      <ul>
        <li>Explore nearby shops</li>
        <li>Add your favorite items to the cart</li>
        <li>Keep track of your receipts easily</li>
      </ul>
      <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
      <p>Happy Shopping! 🛒</p>
      <p>— The <strong>360 Family Team</strong></p>
    `
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}
