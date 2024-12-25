const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')    
const JWT_SECRET = "foodDeliveryApplication"
const nodemailer = require('nodemailer')


    
// create token
const createToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET)
}

//login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).json({ success: false, message: 'User not exist' });
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(500).json({ success: false, message: 'Password not matched' });
        }
        // const data = {
        //     user: {
        //         id: user._id
        //     }
        // }
        // const token = jwt.sign(data,JWT_SECRET)
        const token = createToken(user._id);
        return res.status(200).json({ success: true, token });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });
    }
    
}
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(200).json({ success: false, message: 'User already exists' });
        }
        if (!validator.isEmail(email)) {
            return res.status(500).json({ success: false, message: 'Enter a valid email' });
        }
        if (password.length < 5) {
            return res.status(500).json({ success: false, message: 'Enter a strong password: length should be more than 4' });
        }

        //bcrypt - password hashing
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({
            name: name,
            email: email,
            password: hashPassword
        })

        // const user = await newUser.save()
        // const data = {
        //     newUser: {
        //         id: newUser._id
        //     }
        // }
        // const token = jwt.sign(data,JWT_SECRET)
        const token = createToken(newUser._id)
        return res.status(200).json({ success: true, token });

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });

    }

}

// forget password request
const requestForgetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const otp = crypto.randomBytes(3).toString('hex'); // Generate a random OTP
        user.resetOtp = otp;
        user.otpExpires = Date.now()+300000;

        // Log the generated OTP
        console.log('Generated OTP:', otp);
        console.log('User OTP before saving:', user.resetOtp);

        // Send OTP via email
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'shivammandal83404@gmail.com',
                pass: 'vnyo euaq seey lccw'
            }
        });

        let mailOptions = {
            from: 'shivammandal83404@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        await user.save();
        console.log('User OTP after saving:', user.resetOtp);

        return res.status(200).json({ success: true, message: 'OTP sent successfully' });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Reset password

const resetPassword = async (req, res) => {
    const { email, otp, password } = req.body;

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the OTP matches
        if (user.resetOtp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Check if the OTP has expired
        if (user.otpExpires < Date.now())    {
            return res.status(400).json({ message: 'OTP expired' });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear the OTP and its expiry time
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        // Save the updated user document
        await user.save();

        res.json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { login, register, createToken, requestForgetPassword, resetPassword }