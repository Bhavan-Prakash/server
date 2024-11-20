//working code
// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;
// const { Category } = require('../models/subcategory'); // Import the model

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // Get all categories
// router.get('/', async (req, res) => {
//     try {
//         const categoryList = await Category.find();
//         res.send(categoryList);
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Get category by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'The category with the given id was not found.' });
//         }
//         res.send(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Delete category by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found!', success: false });
//         }
//         res.status(200).json({ success: true, message: 'Category Deleted!' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Create new category
// router.post('/', async (req, res) => {
//     try {
//         const limit = pLimit(2);
//         const imagesToUpload = req.body.images.map((image) => {
//             return limit(async () => {
//                 const result = await cloudinary.uploader.upload(image);
//                 return result;
//             });
//         });

//         const uploadStatus = await Promise.all(imagesToUpload);
//         const imgurl = uploadStatus.map((item) => item.secure_url);

//         let category = new Category({
//             images: imgurl,
//             gender: req.body.gender,
//             title: req.body.title,
//             category: req.body.category,
//             description: req.body.description,
//             price: req.body.price,
//             sizes: req.body.sizes
//         });

//         category = await category.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ error: error.message, status: false });
//     }
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const { Category } = require('../models/subcategory'); // Import the model

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
    { name: 'sizeChart', maxCount: 1 } // Max 1 image for `sizeChart`
]), async (req, res) => {
    try {
        const limit = pLimit(2);  // Limit to 2 concurrent uploads
        
        // Check if files are uploaded for images and sizeChart
        if (!req.files || !req.files.images || !req.files.sizeChart) {
            return res.status(400).json({ error: 'Images and sizeChart are required.', status: false });
        }

        // Upload `images` files to Cloudinary
        const imagesToUpload = req.files.images.map((file) => {
            return limit(async () => {
                const result = await uploadToCloudinary(file.buffer); // Use the helper function
                return result;
            });
        });

        // Upload `sizeChart` file to Cloudinary
        const sizeChartUpload = limit(async () => {
            const result = await uploadToCloudinary(req.files.sizeChart[0].buffer); // Use the helper function
            return result;
        });

        // Wait for all uploads to complete
        const uploadStatus = await Promise.all(imagesToUpload);
        const sizeChartStatus = await sizeChartUpload;

        // Get the secure URLs of the uploaded files
        const imgurl = uploadStatus.map((item) => item.secure_url);
        const sizeChartUrl = sizeChartStatus.secure_url;

        // Create new category with the uploaded image URLs
        let category = new Category({
            images: imgurl,
            gender: req.body.gender,
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            price: req.body.price,
            sizes: req.body.sizes,
            sizeChart: sizeChartUrl,
            color: req.body.color,
            quantityS: req.body.quantityS,
            quantityM: req.body.quantityM,
            quantityL: req.body.quantityL,
            quantityXL: req.body.quantityXL,
            quantityXXL: req.body.quantityXXL,
            quantityXXXL: req.body.quantityXXXL
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
// const { Category } = require('../models/subcategory'); // Import the model

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // Get all categories
// router.get('/', async (req, res) => {
//     try {
//         const categoryList = await Category.find();
//         res.send(categoryList);
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Get category by ID
// // Get all categories with optional type filtering
// router.get('/', async (req, res) => {
//     console.log('Incoming query:', req.query); // Log the incoming query

//     try {
//         const { type } = req.query; // Extract the type from query
//         let filter = {};

//         if (type) {
//             filter.type = type; // Add filter if type is provided
//         }

//         const categoryList = await Category.find(filter);
//         res.send(categoryList);
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });



// // Delete category by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found!', success: false });
//         }
//         res.status(200).json({ success: true, message: 'Category Deleted!' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Create new category
// router.post('/', async (req, res) => {
//     try {
//         const limit = pLimit(2);
//         const imagesToUpload = req.body.images.map((image) => {
//             return limit(async () => {
//                 const result = await cloudinary.uploader.upload(image);
//                 return result;
//             });
//         });

//         const uploadStatus = await Promise.all(imagesToUpload);
//         const imgurl = uploadStatus.map((item) => item.secure_url);

//         let category = new Category({
//             images: imgurl,
//             gender: req.body.gender,
//             title: req.body.title,
//             type: req.body.type,
//             description: req.body.description,
//             price: req.body.price,
//             sizes: req.body.sizes
//         });

//         category = await category.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ error: error.message, status: false });
//     }
// });

// module.exports = router;
