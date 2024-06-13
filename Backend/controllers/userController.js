const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const bcrypt = require('bcrypt')
const JWT_SECRET = "foodDeliveryApplication"


// create token
const createToken=(id)=>{
    return jwt.sign({id},JWT_SECRET)
}

//login user
const login = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(500).json({ success: false, message: 'User not exist' });
        }
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(500).json({ success: false, message: 'Password not matched' });
        }
        // const data = {
        //     user: {
        //         id: user._id
        //     }
        // }
        // const token = jwt.sign(data,JWT_SECRET)
        const token = createToken(user._id);
        return res.status(200).json({ success: true, token});

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error' });        
    }

}
const register = async(req,res)=>{
    const {name,email,password} = req.body;
    
    try{
        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(200).json({ success: false, message: 'User already exists' });
        }
        if(!validator.isEmail(email)){
            return res.status(500).json({ success: false, message: 'Enter a valid email' });
        }
        if(password.length<5){
            return res.status(500).json({ success: false, message: 'Enter a strong password: length should be more than 4' });
        }

        //bcrypt - password hashing
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = await userModel.create({
            name:name,
            email:email,
            password:hashPassword
        })

        // const user = await newUser.save()
        // const data = {
        //     newUser: {
        //         id: newUser._id
        //     }
        // }
        // const token = jwt.sign(data,JWT_SECRET)
        const token =  createToken(newUser._id)
        return res.status(200).json({ success: true, token});

    }catch(error){
        return res.status(500).json({ success: false, message: 'Error' });

    }

}

module.exports = {login,register,createToken}