const nodemailer = require('nodemailer');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

const sendmail = async (req, res) => {
    try {
        const { to, subject, text } = req.body;
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.email,
                pass: process.env.emailPass,
            },
        });

        let content = {
            from: `FlavorFeet<${transporter.options.auth.user}>`,
            to,
            subject,
            text,
        };

        let info = await transporter.sendMail(content);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        console.log('Error sending email:', err);
        res.status(500).json({ message: "Error sending email", error: err.message });
    }
}

const sendBill = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            console.error("Order not found");
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        const user = await userModel.findById(order.userId);
        if (!user) {
            console.error("User not found");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!user.email) {
            console.error("User email is missing");
            return res.status(400).json({ success: false, message: "User email is missing" });
        }

        const orderItems = order.items.map(item => `${item.name} x ${item.quantity}`).join('\n');
        const billText = `Hi ${user.name},\n\nHere is your bill for the order:\n\nTotal Amount: Rs ${order.amount}\nItems:\n${orderItems}\n\nThank you for ordering with us!`;

        const emailContent = {
            from: `FlavorFeet<${transporter.options.auth.user}>`,
            to: user.email,
            subject: 'Your Order Bill',
            text: billText,
        };

        const emailRes = await sendmail(emailContent);
        if (emailRes.success) {
            return res.status(200).json({ success: true, message: "Bill sent to your email successfully" });
        } else {
            console.error("Failed to send bill email:", emailRes.error);
            return res.status(500).json({ success: false, message: "Failed to send bill email", error: emailRes.error });
        }
    } catch (error) {
        console.error('Error sending bill:', error);
        return res.status(500).json({ success: false, message: "Error sending bill" });
    }
};


module.exports = { sendmail, sendBill };
