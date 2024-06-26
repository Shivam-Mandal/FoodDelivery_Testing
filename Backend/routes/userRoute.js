const express = require('express')
const {login,register,requestForgetPassword,resetPassword}  = require('../controllers/userController')
const router = express.Router()

router.post("/login",login)
router.post("/register",register)
router.post("/forget-password",requestForgetPassword)
router.post("/reset-password",resetPassword)

module.exports = router;