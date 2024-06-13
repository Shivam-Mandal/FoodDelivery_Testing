const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/auth');

router.post('/add', authMiddleware, addToCart);
router.post('/remove', authMiddleware, removeFromCart);
router.post('/get', authMiddleware, getCart);

module.exports = router;
