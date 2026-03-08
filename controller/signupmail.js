import sgMail from '@sendgrid/mail';

import dotenv from 'dotenv';

// Load .env variables
dotenv.config();
// Email transporter setup

sgMail.setApiKey(process.env.EMAIL_PASS);


export async function sendWelcomeEmail(email, name) {
  try {
    const msg = {
      to: email,                        // User ka email
      from: process.env.EMAIL_USER,      // Verified sender in SendGrid
      subject: 'Welcome to 360! 🎉',
      html: `
        <h2>Hi ${name},</h2>
        <p>Welcome to <strong>360 Family</strong>! We're excited to have you on board.</p>
        <ul>
          <li>Explore nearby shops</li>
          <li>Add your favorite items to the cart</li>
          <li>Keep track of your receipts easily</li>
        </ul>
        <p>Happy Shopping! 🛒</p>
        <p>— The <strong>360 Family Team</strong></p>
      `,
    };

    await sgMail.send(msg);
    console.log(`Welcome email sent to ${email}`);
  } catch (err) {
    console.error("Error sending welcome email:", err);
  }
}