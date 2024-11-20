// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');

// const { Category } = require('../models/new'); // Import the model

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // Configure multer to store files temporarily
// const storage = multer.memoryStorage(); // Store files in memory temporarily
// const upload = multer({ storage: storage });

// // Helper function to upload files to Cloudinary using a promise
// const uploadToCloudinary = (fileBuffer) => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' },
//             (error, result) => {
//                 if (error) {
//                     reject(error);  // Reject the promise if there's an error
//                 } else {
//                     resolve(result);  // Resolve the promise with the result
//                 }
//             }
//         );
//         uploadStream.end(fileBuffer); // Pass the buffer to Cloudinary
//     });
// };
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// // Get category by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await categorySchema.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'The category with the given id was not found.' });
//         }
//         res.send(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         // Find and delete the category by ID
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);  // Use the correct Category model
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found!', success: false });
//         }
//         res.status(200).json({ success: true, message: 'Category Deleted!', data: deletedCategory });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });




// // Create new category and upload images
// router.post('/', upload.fields([
//     { name: 'images', maxCount: 10 }, // Max 10 images for `images`
//     { name: 'sizeChart', maxCount: 1 } // Max 1 image for `sizeChart`
// ]), async (req, res) => {
//     try {
//         const limit = pLimit(2);  // Limit to 2 concurrent uploads
        
//         // Check if files are uploaded for images and sizeChart
//         if (!req.files || !req.files.images || !req.files.sizeChart) {
//             return res.status(400).json({ error: 'Images and sizeChart are required.', status: false });
//         }

//         // Upload `images` files to Cloudinary
//         const imagesToUpload = req.files.images.map((file) => {
//             return limit(async () => {
//                 const result = await uploadToCloudinary(file.buffer); // Use the helper function
//                 return result;
//             });
//         });

//         // Upload `sizeChart` file to Cloudinary
//         const sizeChartUpload = limit(async () => {
//             const result = await uploadToCloudinary(req.files.sizeChart[0].buffer); // Use the helper function
//             return result;
//         });

//         // Wait for all uploads to complete
//         const uploadStatus = await Promise.all(imagesToUpload);
//         const sizeChartStatus = await sizeChartUpload;

//         // Get the secure URLs of the uploaded files
//         const imgurl = uploadStatus.map((item) => item.secure_url);
//         const sizeChartUrl = sizeChartStatus.secure_url;

//         // Create new category with the uploaded image URLs
//         let category = new Category({
//             images: imgurl,
//             title: req.body.title,
//             description: req.body.description,
//             price: req.body.price,
//             quantityS: req.body.quantityS,
//             quantityM: req.body.quantityM,
//             quantityL: req.body.quantityL,
//             quantityXL: req.body.quantityXL,
//             quantityXXL: req.body.quantityXXL,
//             quantityXXXL: req.body.quantityXXXL,
//             sizes: req.body.sizes,
//             sizeChart: sizeChartUrl,
//             color: req.body.color
//         });

//         // Save the category in the database
//         category = await category.save();
//         res.status(201).json(category);

//     } catch (error) {
//         res.status(500).json({ error: error.message, status: false });
//     }
// });

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');

// const { Category } = require('../models/new'); // Import the model

// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // Configure multer to store files temporarily
// const storage = multer.memoryStorage(); // Store files in memory temporarily
// const upload = multer({ storage: storage });

// // Helper function to upload files to Cloudinary using a promise
// const uploadToCloudinary = (fileBuffer) => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' },
//             (error, result) => {
//                 if (error) {
//                     reject(error);  // Reject the promise if there's an error
//                 } else {
//                     resolve(result);  // Resolve the promise with the result
//                 }
//             }
//         );
//         uploadStream.end(fileBuffer); // Pass the buffer to Cloudinary
//     });
// };

// // GET all categories
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // GET category by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found.' });
//         }
//         res.status(200).json(category);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // DELETE category by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found!', success: false });
//         }
//         res.status(200).json({ success: true, message: 'Category deleted!', data: deletedCategory });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // POST - Create new category and upload images
// router.post('/', upload.fields([
//     { name: 'images', maxCount: 10 }, // Max 10 images for `images`
//     { name: 'sizeChart', maxCount: 1 } // Max 1 image for `sizeChart`
// ]), async (req, res) => {
//     try {
//         const limit = pLimit(2);  // Limit to 2 concurrent uploads
        
//         // Check if files are uploaded for images and sizeChart
//         if (!req.files || !req.files.images || !req.files.sizeChart) {
//             return res.status(400).json({ error: 'Images and sizeChart are required.', status: false });
//         }

//         // Upload `images` files to Cloudinary
//         const imagesToUpload = req.files.images.map((file) => {
//             return limit(async () => {
//                 const result = await uploadToCloudinary(file.buffer); // Use the helper function
//                 return result;
//             });
//         });

//         // Upload `sizeChart` file to Cloudinary
//         const sizeChartUpload = limit(async () => {
//             const result = await uploadToCloudinary(req.files.sizeChart[0].buffer); // Use the helper function
//             return result;
//         });

//         // Wait for all uploads to complete
//         const uploadStatus = await Promise.all(imagesToUpload);
//         const sizeChartStatus = await sizeChartUpload;

//         // Get the secure URLs of the uploaded files
//         const imgurl = uploadStatus.map((item) => item.secure_url);
//         const sizeChartUrl = sizeChartStatus.secure_url;

//         // Create new category with the uploaded image URLs
//         let category = new Category({
//             images: imgurl,
//             title: req.body.title,
//             description: req.body.description,
//             price: req.body.price,
//             quantityS: req.body.quantityS,
//             quantityM: req.body.quantityM,
//             quantityL: req.body.quantityL,
//             quantityXL: req.body.quantityXL,
//             quantityXXL: req.body.quantityXXL,
//             quantityXXXL: req.body.quantityXXXL,
//             sizes: req.body.sizes,
//             sizeChart: sizeChartUrl,
//             color: req.body.color
//         });

//         // Save the category in the database
//         category = await category.save();
//         res.status(201).json(category);

//     } catch (error) {
//         res.status(500).json({ error: error.message, status: false });
//     }
// });

// // PATCH - Update category by ID (for updating quantities and images)
// router.patch('/:id', upload.fields([
//     { name: 'images', maxCount: 10 }, // Max 10 images for `images`
//     { name: 'sizeChart', maxCount: 1 } // Max 1 image for `sizeChart`
// ]), async (req, res) => {
//     try {
//         const limit = pLimit(2);  // Limit to 2 concurrent uploads
        
//         // Check if files are uploaded for images and sizeChart
//         const updateData = { ...req.body };

//         // If new images are provided, upload to Cloudinary
//         if (req.files && req.files.images) {
//             const imagesToUpload = req.files.images.map((file) => {
//                 return limit(async () => {
//                     const result = await uploadToCloudinary(file.buffer); // Use the helper function
//                     return result;
//                 });
//             });

//             const uploadStatus = await Promise.all(imagesToUpload);
//             const imgurl = uploadStatus.map((item) => item.secure_url);
//             updateData.images = imgurl;
//         }

//         // If new sizeChart is provided, upload to Cloudinary
//         if (req.files && req.files.sizeChart) {
//             const sizeChartUpload = limit(async () => {
//                 const result = await uploadToCloudinary(req.files.sizeChart[0].buffer); // Use the helper function
//                 return result;
//             });

//             const sizeChartStatus = await sizeChartUpload;
//             updateData.sizeChart = sizeChartStatus.secure_url;
//         }

//         // Update category by ID
//         const category = await Category.findByIdAndUpdate(
//             req.params.id, 
//             { $set: updateData },  // Update only the fields passed in the body
//             { new: true }  // Return the updated category
//         );

//         if (!category) {
//             return res.status(404).json({ message: 'Category not found!', success: false });
//         }

//         res.status(200).json({ success: true, message: 'Category Updated!', data: category });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// module.exports = router;









// const express = require('express');
// const router = express.Router();
// const pLimit = require('p-limit');
// const cloudinary = require('cloudinary').v2;
// const multer = require('multer');

// const { Category } = require('../models/new'); // Import the model


// cloudinary.config({
//     cloud_name: process.env.cloudinary_Config_Cloud_Name,
//     api_key: process.env.cloudinary_Config_api_key,
//     api_secret: process.env.cloudinary_Config_api_secret,
// });

// // Configure multer to store files temporarily
// const storage = multer.memoryStorage(); // Store files in memory temporarily
// const upload = multer({ storage: storage });

// // Helper function to upload files to Cloudinary using a promise
// const uploadToCloudinary = (fileBuffer) => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' },
//             (error, result) => {
//                 if (error) {
//                     reject(error);  // Reject the promise if there's an error
//                 } else {
//                     resolve(result);  // Resolve the promise with the result
//                 }
//             }
//         );
//         uploadStream.end(fileBuffer); // Pass the buffer to Cloudinary
//     });
// };
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Category.find();
//         res.status(200).json(categories);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });


// // Get category by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await categorySchema.findById(req.params.id);
//         if (!category) {
//             return res.status(404).json({ message: 'The category with the given id was not found.' });
//         }
//         res.send(category);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         // Find and delete the category by ID
//         const deletedCategory = await Category.findByIdAndDelete(req.params.id);  // Use the correct Category model
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found!', success: false });
//         }
//         res.status(200).json({ success: true, message: 'Category Deleted!', data: deletedCategory });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// router.post('/', async (req, res) => {
//     const { userId, orderDate, paymentId, userEmail, orderDetails } = req.body;

//     // Check if orderDetails is provided and is an array
//     if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
//         return res.status(400).json({ message: 'Order details are required' });
//     }

//     try {
//         // Loop through each ordered item and update the stock
//         for (const item of orderDetails) {
//             const { image, quantity, size } = item; // Each item has image, quantity, and size

//             // Find the product by checking if the images array includes the ordered image link
//             const category = await Category.findOne({ images: image });
//             if (!category) {
//                 return res.status(404).json({ message: `Product with image "${image}" not found` });
//             }

//             // Check stock availability based on the ordered size
//             let availableQuantity;
//             switch (size) {
//                 case 'S':
//                     availableQuantity = category.quantityS;
//                     break;
//                 case 'M':
//                     availableQuantity = category.quantityM;
//                     break;
//                 case 'L':
//                     availableQuantity = category.quantityL;
//                     break;
//                 case 'XL':
//                     availableQuantity = category.quantityXL;
//                     break;
//                 case 'XXL':
//                     availableQuantity = category.quantityXXL;
//                     break;
//                 case 'XXXL':
//                     availableQuantity = category.quantityXXXL;
//                     break;
//                 default:
//                     return res.status(400).json({ message: `Invalid size '${size}' provided for product with image "${image}"` });
//             }

//             // Check if ordered quantity exceeds available quantity
//             if (quantity > availableQuantity) {
//                 return res.status(400).json({
//                     message: `Sorry, the requested quantity for "${category.title}" in size '${size}' is not available. Available quantity: ${availableQuantity}`
//                 });
//             }

//             // Adjust stock quantity if available
//             switch (size) {
//                 case 'S':
//                     category.quantityS -= quantity;
//                     break;
//                 case 'M':
//                     category.quantityM -= quantity;
//                     break;
//                 case 'L':
//                     category.quantityL -= quantity;
//                     break;
//                 case 'XL':
//                     category.quantityXL -= quantity;
//                     break;
//                 case 'XXL':
//                     category.quantityXXL -= quantity;
//                     break;
//                 case 'XXXL':
//                     category.quantityXXXL -= quantity;
//                     break;
//             }

//             // Save the updated category in the database
//             await category.save();
//         }

//         // Respond with success message
//         res.status(200).json({ message: 'Order processed and stock updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });


// module.exports = router;


const express = require('express');
const router = express.Router();
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Category } = require('../models/new'); // Import Category model
const { Category: SubCategory } = require('../models/subcategory'); // Import SubCategory model

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
router.get('/reducer', async (req, res) => {
    const { image } = req.query; // Get the image from query parameters

    if (!image) {
        return res.status(400).json({ message: 'Image query parameter is required' });
    }

    try {
        // Check in Category first
        const category = await Category.findOne({ images: image });
        if (category) {
            return res.status(200).json({
                source: 'Category',
                data: category  // Return the full category data
            });
        }

        // Check in SubCategory if not found in Category
        const subCategory = await SubCategory.findOne({ images: image });
        if (subCategory) {
            return res.status(200).json({
                source: 'SubCategory',
                data: subCategory  // Return the full subcategory data
            });
        }

        // If not found in either
        res.status(404).json({ message: `Product with image "${image}" not found in both categories and subcategories.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
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


router.post('/', async (req, res) => {
    const { userId, orderDate, paymentId, userEmail, orderDetails } = req.body;

    // Check if orderDetails is provided and is an array
    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
        return res.status(400).json({ message: 'Order details are required' });
    }

    try {
        // Loop through each ordered item and update the stock
        for (const item of orderDetails) {
            const { image, quantity, size } = item; // Each item has image, quantity, and size

            // Find the product by checking if the images array includes the ordered image link
            const category = await Category.findOne({ images: image });
            const subCategory = await SubCategory.findOne({ images: image });

            if (!category && !subCategory) {
                return res.status(404).json({ message: `Product with image "${image}" not found in both categories and subcategories.` });
            }

            let availableQuantity;
            let selectedCategory = category || subCategory;  // Use whichever is found

            // Check stock availability based on the ordered size
            switch (size) {
                case 'S':
                    availableQuantity = selectedCategory.quantityS;
                    break;
                case 'M':
                    availableQuantity = selectedCategory.quantityM;
                    break;
                case 'L':
                    availableQuantity = selectedCategory.quantityL;
                    break;
                case 'XL':
                    availableQuantity = selectedCategory.quantityXL;
                    break;
                case 'XXL':
                    availableQuantity = selectedCategory.quantityXXL;
                    break;
                case 'XXXL':
                    availableQuantity = selectedCategory.quantityXXXL;
                    break;
                default:
                    return res.status(400).json({ message: `Invalid size '${size}' provided for product with image "${image}"` });
            }

            // Check if ordered quantity exceeds available quantity
            if (quantity > availableQuantity) {
                return res.status(400).json({
                    message: `Sorry, the requested quantity for "${selectedCategory.title}" in size '${size}' is not available. Available quantity: ${availableQuantity}`
                });
            }

            // Adjust stock quantity if available
            switch (size) {
                case 'S':
                    selectedCategory.quantityS -= quantity;
                    break;
                case 'M':
                    selectedCategory.quantityM -= quantity;
                    break;
                case 'L':
                    selectedCategory.quantityL -= quantity;
                    break;
                case 'XL':
                    selectedCategory.quantityXL -= quantity;
                    break;
                case 'XXL':
                    selectedCategory.quantityXXL -= quantity;
                    break;
                case 'XXXL':
                    selectedCategory.quantityXXXL -= quantity;
                    break;
            }

            // Save the updated category or subcategory in the database
            await selectedCategory.save();
        }

        // Respond with success message
        res.status(200).json({ message: 'Order processed and stock updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
