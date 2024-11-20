// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;
// const { Category } = require('../models/homepage'); 

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
//             title: req.body.title,
//             images: imgurl
//         });

//         category = await category.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ error: error.message, status: false });
//     }
// });

// module.exports = router;








const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { Category } = require('../models/homepage'); 
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
});

// Configure Multer
const storage = multer.diskStorage({});
const upload = multer({ storage });


// Get all categories
router.get('/', async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.send(categoryList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'The category with the given id was not found.' });
        }
        res.send(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete category by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found!', success: false });
        }
        res.status(200).json({ success: true, message: 'Category Deleted!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// Create new categories with PC image upload
router.post('/', upload.array('images', 3), async (req, res) => {
    try {
        if (!req.files || req.files.length !== 3 || !req.body.titles) {
            return res.status(400).json({ message: 'Please provide exactly 3 images and 3 titles.' });
        }

        // Titles from request body
        const titles = JSON.parse(req.body.titles); // Expecting JSON array in the `titles` field
        if (titles.length !== 3) {
            return res.status(400).json({ message: 'Please provide exactly 3 titles.' });
        }

        // Upload images to Cloudinary
        const uploadPromises = req.files.map((file) =>
            cloudinary.uploader.upload(file.path)
        );
        const uploadResults = await Promise.all(uploadPromises);

        // Create categories with corresponding titles and image URLs
        const categories = titles.map((title, index) => ({
            title,
            images: [uploadResults[index].secure_url], // Each category gets its respective image URL
        }));

        // Save categories to the database
        const savedCategories = await Category.insertMany(categories);

        res.status(201).json(savedCategories);
    } catch (error) {
        res.status(500).json({ error: error.message, status: false });
    }
});

module.exports = router;














// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');
// const { Category } = require('../models/homepage'); 

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // Configure multer storage
// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Add a timestamp to avoid file name collisions
//     }
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         const filetypes = /mp4/;
//         const extname = filetypes.test(file.originalname.toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);
        
//         if (mimetype && extname) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only .mp4 video files are allowed!'));
//         }
//     }
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

// // Create new category with video upload using 'images' as the key
// router.post('/', upload.single('images'), async (req, res) => {
//     try {
//         const limit = pLimit(2); // Limit the number of concurrent uploads

//         // Upload the video to Cloudinary using 'images' as the key
//         const videoUpload = await limit(async () => {
//             const result = await cloudinary.uploader.upload(req.file.path, {
//                 resource_type: 'video', // Specify that the upload is a video
//             });
//             return result;
//         });

//         // Create a new category with the uploaded video URL (stored in 'images')
//         let category = new Category({
//             title: req.body.title,
//             images: videoUpload.secure_url // Storing video URL in images field
//         });

//         category = await category.save();
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(500).json({ error: error.message, status: false });
//     }
// });

// module.exports = router;



