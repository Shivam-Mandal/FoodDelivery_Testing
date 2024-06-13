const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { placeOrder, verify, userOrder, listOrder, updateStatus } = require('../controllers/orderController');

// Route to place an order, with authentication middleware
router.post('/place', authMiddleware, placeOrder);

// Route to verify an order
router.post('/verify', verify);

//user order router 
router.post('/userorder',authMiddleware,userOrder)

router.get('/list',listOrder)

router.post('/status',updateStatus)
module.exports = router;