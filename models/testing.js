const mongoose = require('mongoose');
const newDbConnection = require('../dbNewConnection');

const categorySchema = new mongoose.Schema({
    images: [{ type: String, required: true }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantityS: { type: Number, required: true },
    quantityM: { type: Number, required: true },
    quantityL: { type: Number, required: true },
    quantityXL: { type: Number, required: true },
    quantityXXL: { type: Number, required: true },
    quantityXXXL: { type: Number, required: true },
    sizes: [{ type: String, required: true }],
    sizeChart: [{ type: String, required: true }]
});

// Define a method to reduce quantity based on order size
categorySchema.methods.placeOrder = async function (size, orderQuantity) {
    const sizeField = `quantity${size}`;
    if (this[sizeField] < orderQuantity) {
        throw new Error('Insufficient quantity available');
    }
    this[sizeField] -= orderQuantity;
    await this.save();
    return this[sizeField];
};

const Category = newDbConnection.model('Category', categorySchema, 'newpage');
module.exports = { Category };
