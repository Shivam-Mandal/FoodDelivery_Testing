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
                user: "shivammandal83404@gmail.com",
                pass: "vnyo euaq seey lccw",
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
        const { userId, orderId } = req.body;

        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure 'user.email' exists before sending email
        if (!user.email) {
            return res.status(400).json({ message: "User email is missing" });
        }

        const orderItems = order.items.map(item => `${item.name} x ${item.quantity}`).join('\n');
        const billText = `Hi ${user.name},\n\nHere is your bill for the order:\n\nTotal Amount: Rs ${order.amount}\nItems:\n${orderItems}\n\nThank you for ordering with us!`;
        const emailContent = {
            to: user.email,
            subject: 'Your Order Bill',
            text: billText,
        };

        const emailRes = await sendmail(emailContent);
        if (emailRes.success) {
            res.status(200).json({ message: "Bill sent to your email successfully" });
        } else {
            res.status(500).json({ message: "Failed to send bill email", error: emailRes.error });
        }
    } catch (error) {
        console.error('Error sending bill:', error);
        res.status(500).json({ message: "Error sending bill" });
    }
}

module.exports = { sendmail, sendBill };
