const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    },
    resetOtp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    }

},{minimize:false})

const userModel = mongoose.model.user|| mongoose.model("user",userSchema);
module.exports = userModel;