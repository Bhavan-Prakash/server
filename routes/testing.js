const express = require('express');
const router = express.Router();
const { Category } = require('../models/testing');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Place an order for a product
router.post('/order', async (req, res) => {
    const { productId, size, orderQuantity } = req.body;

    try {
        const product = await Category.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedQuantity = await product.placeOrder(size, orderQuantity);

        res.status(200).json({ message: 'Order placed successfully', updatedQuantity });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
