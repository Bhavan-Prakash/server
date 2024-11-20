const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const { Category } = require('../models/category'); // Import the model

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
});

// Configure multer to store files temporarily
const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage: storage });

// Helper function to upload files to Cloudinary using a promise
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' },
            (error, result) => {
                if (error) {
                    reject(error);  // Reject the promise if there's an error
                } else {
                    resolve(result);  // Resolve the promise with the result
                }
            }
        );
        uploadStream.end(fileBuffer); // Pass the buffer to Cloudinary
    });
};
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await categorySchema.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'The category with the given id was not found.' });
        }
        res.send(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // Find and delete the category by ID
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);  // Use the correct Category model
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found!', success: false });
        }
        res.status(200).json({ success: true, message: 'Category Deleted!', data: deletedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Create new category and upload images
router.post('/', upload.fields([
    { name: 'images', maxCount: 10 }, // Max 10 images for `images`

]), async (req, res) => {
    try {
        const limit = pLimit(2);  // Limit to 2 concurrent uploads
        
        // Check if files are uploaded for images and sizeChart
        if (!req.files || !req.files.images) {
            return res.status(400).json({ error: 'Images are required.', status: false });
        }

        // Upload `images` files to Cloudinary
        const imagesToUpload = req.files.images.map((file) => {
            return limit(async () => {
                const result = await uploadToCloudinary(file.buffer); // Use the helper function
                return result;
            });
        });

        

        // Wait for all uploads to complete
        const uploadStatus = await Promise.all(imagesToUpload);


        // Get the secure URLs of the uploaded files
        const imgurl = uploadStatus.map((item) => item.secure_url);


        // Create new category with the uploaded image URLs
        let category = new Category({
            images: imgurl,
            name: req.body.name,
            color: req.body.color
        });

        // Save the category in the database
        category = await category.save();
        res.status(201).json(category);

    } catch (error) {
        res.status(500).json({ error: error.message, status: false });
    }
});

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // In-memory storage for categories
// let categories = []; // Simulate a database with an array

// // POST endpoint to create a new category
// router.post('/', async (req, res) => {
//     const limit = pLimit(2);

//     try {
//         const imagesToUpload = req.body.images.map((image) => {
//             return limit(async () => {
//                 const result = await cloudinary.uploader.upload(image);
//                 return result;
//             });
//         });

//         const uploadStatus = await Promise.all(imagesToUpload);
//         const imgUrls = uploadStatus.map((item) => item.secure_url);

//         const category = {
//             id: categories.length + 1, // Simple ID generation
//             name: req.body.name,
//             images: imgUrls,
//             color: req.body.color
//         };

//         categories.push(category); // Save to in-memory storage

//         res.status(201).json(category);
//     } catch (err) {
//         res.status(500).json({
//             error: "Image cannot upload!",
//             status: false
//         });
//     }
// });

// // GET all categories
// router.get('/', async (req, res) => {
//     res.json(categories);
// });

// // GET a category by ID
// router.get('/:id', async (req, res) => {
//     const category = categories.find(cat => cat.id === parseInt(req.params.id));
//     if (!category) {
//         return res.status(404).json({ message: 'The category with the given id was not found.' });
//     }
//     res.json(category);
// });

// // DELETE a category by ID
// router.delete('/:id', async (req, res) => {
//     const index = categories.findIndex(cat => cat.id === parseInt(req.params.id));
//     if (index === -1) {
//         return res.status(404).json({ message: 'Category not found!' });
//     }
//     categories.splice(index, 1);
//     res.status(200).json({
//         success: true,
//         message: 'Category Deleted!'
//     });
// });

// module.exports = router;
