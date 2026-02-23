import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendOrderSuccessEmail = async (userEmail, orderDetails) => {
  try {
    // 🔹 1. Create transporter using only email & pass
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gmail ke liye
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 🔹 2. Email content
    const mailOptions = {
      from: `"team360-siet" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Order Placed Successfully ✅ in ${orderDetails.shop}`,
      html: `
  <h1>Thank you for your order!</h1>
  <p><strong>Payment Method:</strong> ${orderDetails.method}</p>
  <p><strong>Total:</strong> ₹${orderDetails.total}</p>

  <p>Your order has been placed successfully ✅</p>
  <p>Arrives in 30 minutes ⏱️</p>

  <a href="${orderDetails.whatsappLink}" 
     style="
        display:inline-block;
        padding:12px 20px;
        background-color:#25D366;
        color:white;
        text-decoration:none;
        border-radius:8px;
        font-weight:bold;
     ">
     Chat with Shop on WhatsApp 💬
  </a>

  <p style="margin-top:20px;">Thank you for shopping with us 🛒</p>
`,
    };

    // 🔹 3. Send email
    await transporter.sendMail(mailOptions);
  
  } catch (err) {
    console.error("Error sending order email:", err);
  }
};


//order success email to shop

export const sendShopOrderEmail = async (shopEmail, orderData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsHtml = orderData.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price}</td>
        <td>₹${item.price * item.quantity}</td>
      </tr>
    `).join("");

    const mailOptions = {
      from: `"team360-siet" <${process.env.EMAIL_USER}>`,
      to: shopEmail,
      subject: `🛒 New Order Received - ${orderData.shopName}`,
      html: `
        <h2>New Order Received 🎉</h2>

        <h3>Customer Details:</h3>
        <p><strong> Name:</strong> ${orderData.userName}</p>
        

        <h3>Order Details:</h3>
        <table border="1" cellpadding="8" cellspacing="0">
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
          ${itemsHtml}
        </table>

        <h3>Total: ₹${orderData.total}</h3>
        <p><strong>Payment Method:</strong> ${orderData.method}</p>
          <p><strong>Location:</strong> ${orderData.userlocation}</p>
          <p><strong>Phone:</strong> ${orderData.userPhone}</p>
        <p><strong>WhatsApp:</strong> ${orderData.userWhatsapp}</p>

          <a href="https://wa.me/${orderData.userWhatsapp}" 
       style="
          display:inline-block;
          padding:10px 18px;
          background-color:#25D366;
          color:white;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
          margin-top:10px;
       " target="_blank">
       Chat with User on WhatsApp 💬
    </a>

        <p style="color:green;font-weight:bold;">
          Please prepare the order Fastly. 🚚
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

  } catch (err) {
    console.error("Error sending shop email:", err);
  }
};

