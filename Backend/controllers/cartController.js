const userModel = require('../models/userModel');

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;
            
        console.log(`user id: `, userId);
        console.log(`item id: `, itemId);

        const userData = await userModel.findById(userId);
        console.log(userData)
        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData },{new:true});
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: 'Unable to add to cart' });
    }
};

// Remove from cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        } else {
            return res.status(400).json({ success: false, message: 'Item not in cart or already at zero' });
        }

        await userModel.findByIdAndUpdate(userId, { cartData },{new:true});
        res.json({ success: true, message: "Cart item removed" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: 'Unable to remove from cart' });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: 'Unable to get cart items' });
    }
};

module.exports = { addToCart, removeFromCart, getCart };
