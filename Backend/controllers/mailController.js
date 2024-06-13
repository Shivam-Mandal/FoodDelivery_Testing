    const nodemailer = require('nodemailer');

    const sendmail = async(req,res)=>{
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
                from: `FlavorFeet<${transporter.user}>`,
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

    module.exports = sendmail;