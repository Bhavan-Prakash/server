const mongoose = require('mongoose');
const newDbConnection = require('../dbNewConnection');

// Define the schema
const categorySchema = new mongoose.Schema({
    images: [
        {
            type: String,
            required: true
        }
    ],
    gender: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityS: {
        type: Number,
        required: true
    },
    quantityM: {
        type: Number,
        required: true
    },
    quantityL: {
        type: Number,
        required: true
    },
    quantityXL: {
        type: Number,
        required: true
    },
    quantityXXL: {
        type: Number,
        required: true
    },
    quantityXXXL: {
        type: Number,
        required: true
    },
    sizes: [
        {
            type: String,
            required: true
        }
    ],
    sizeChart: [
        {
            type: String,
            required: true
        }
    ]
});

categorySchema.virtual('id').get(function () {
    return this._id.toString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

// Create the model with the new connection
const Category = newDbConnection.model('Category', categorySchema, 'subcategory');
// const Category = newDbConnection.model('Category', categorySchema);

module.exports = { Category, categorySchema };
