const mongoose = require('mongoose');
const newDbConnection = require('../dbNewConnection');

// Define the schema
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    images: [
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
const Category = newDbConnection.model('Category', categorySchema, 'homepage');
// const Category = newDbConnection.model('Category', categorySchema);

module.exports = { Category, categorySchema };





// const mongoose = require('mongoose');
// const newDbConnection = require('../dbNewConnection');

// // Define the schema
// const categorySchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     images: {   // Field for storing the video URL (named 'images')
//         type: String,  // Store video URL as a string
//         required: true
//     }
// });

// categorySchema.virtual('id').get(function () {
//     return this._id.toString();
// });

// categorySchema.set('toJSON', {
//     virtuals: true,
// });

// // Create the model with the new connection
// const Category = newDbConnection.model('Category', categorySchema, 'homepage');

// module.exports = { Category, categorySchema };
