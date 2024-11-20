
// with moongose
const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    images:[
        {
            type:String,
            required:true
        }
    ],
    color:{
        type:String,
        required:true
    }
})

categorySchema.virtual('id').get(function () {
    return this._id.toString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

// exports.Category = mongoose.model('Category',categorySchema);
const Category = mongoose.model('Category', categorySchema, 'categories');
// exports.categorySchema = categorySchema;

module.exports = { Category, categorySchema };






//without moongose

// Define the Category class with validation methods
// class Category {
//     constructor(name, images, color) {
//         if (!name || typeof name !== 'string') throw new Error('Invalid name');
//         if (!Array.isArray(images) || !images.every(img => typeof img === 'string')) throw new Error('Invalid images');
//         if (!color || typeof color !== 'string') throw new Error('Invalid color');

//         this.name = name;
//         this.images = images;
//         this.color = color;
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
//     static create(name, images, color) {
//         return new Category(name, images, color);
//     }
// }

// // Example usage
// try {
//     const category = Category.create('Nature', ['image1.jpg', 'image2.jpg'], 'green');
//     category.setId('1234567890abcdef'); // Setting an id manually

//     console.log(category);
//     console.log(category.id); // Outputs: 1234567890abcdef
// } catch (error) {
//     console.error(error.message);
// }

// exports.Category = Category;
