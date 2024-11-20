// Define the Category class with validation methods
// class Category2 {
//     constructor(images, title, description, price, sizes) {
//         if (!Array.isArray(images) || !images.every(img => typeof img === 'string')) throw new Error('Invalid images');
//         if (!title || typeof title !== 'string') throw new Error('Invalid title');
//         if (!description || typeof description !== 'string') throw new Error('Invalid description');
//         if (!price || typeof price !== 'number') throw new Error('Invalid price');
//         if (!sizes || typeof sizes !== 'string') throw new Error('Invalid sizes');



//         this.images = images;
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.sizes = sizes;


//     }

//     // Method to get the id as a string
//     get id() {
//         return this._id ? this._id.toString() : null;
//     }

//     // Method to set an id
//     setId(id) {
//         this._id = id;
//     }

//     // Static method to create a new category instance
//     static create(images, title, description, price, sizes) {
//         return new Category(images, title, description, price, sizes);
//     }
// }

// // Example usage
// try {
//     const category2 = Category2.create('Nature', ['image1.jpg', 'image2.jpg'], 'green');
//     category2.setId('1234567890abcdef'); // Setting an id manually

//     console.log(category2);
//     console.log(category2.id); // Outputs: 1234567890abcdef
// } catch (error) {
//     console.error(error.message);
// }

// exports.Category2 = Category2;



// const mongoose = require('mongoose');
// const newDbConnection = require('../dbNewConnection');

// const categorySchema = mongoose.Schema({
//     images:[
//         {
//             type:String,
//             required:true
//         }
//     ],
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     sizes:[
//         {
//         type:String,
//         required:true
//     }
// ]
// })

// categorySchema.virtual('id').get(function () {
//     return this._id.toString();
// });

// categorySchema.set('toJSON', {
//     virtuals: true,
// });

// exports.Category = mongoose.model('Category',categorySchema);
// exports.categorySchema = categorySchema;



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
const Category = newDbConnection.model('Category', categorySchema, 'newpage');
// const Category = newDbConnection.model('Category', categorySchema);

module.exports = { Category, categorySchema };
