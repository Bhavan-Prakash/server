// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');

// app.use(cors());
// app.options('*',cors())

// //middleware
// app.use(bodyParser.json());


// //routes
// const categoryRoutes = require('./routes/categories');
// app.use(`/api/category`,categoryRoutes);


// //Database
// mongoose.connect(process.env.CONNECTION_STRING, {
//     //userNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=> {
//     console.log('Database Connection Is Ready...');

// //server
//     app.listen(process.env.PORT,() => {
//     console.log(`server is running at http://localhost:${process.env.PORT}
//     `);
// })
// })
// .catch((err)=> {
//     console.log(err);
// })


//working code
// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config(); // Ensure .env variables are loaded

// // Middleware
// app.use(cors()); // Enable CORS
// app.use(express.json()); // Built-in middleware for JSON parsing

// // Routes
// const categoryRoutes = require('./routes/categories');
// app.use('/api/category', categoryRoutes); // Use the category routes

// //new route
// const newRoutes = require('./routes/new');
// app.use('/api/new', newRoutes); // Use the category routes

// // Database connection
// mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true, // Uncomment if using older version of MongoDB driver
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Database Connection Is Ready...');
//     // Start the server
//     app.listen(process.env.PORT, () => {
//         console.log(`Server is running at http://localhost:${process.env.PORT}`);
//     });
// })
// .catch((err) => {
//     console.error('Database connection error:', err);
// });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Ensure .env variables are loaded

// Import the new database connection
const newDbConnection = require('./dbNewConnection');

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Built-in middleware for JSON parsing

// Routes
const categoryRoutes = require('./routes/categories');
app.use('/api/category', categoryRoutes); // Use the category routes

const emailRoutes = require('./routes/emailRoutes');
app.use('/api/mail', emailRoutes); // Use the category routes

const reducer = require('./routes/reducer');
app.use('/api/reducer', reducer); // Use the category routes

const reducercategory = require('./routes/reducescategory');
app.use('/api/reducercategory', reducercategory); // Use the category routes



const returnUser = require('./routes/returnUser');
app.use('/api/returnUser', returnUser); // Use the category routes

const newOrderAdmin = require('./routes/newOrderAdmin');
app.use('/api/newOrderAdmin', newOrderAdmin); // Use the category routes

const newOrderUser = require('./routes/newOrderUser');
app.use('/api/newOrderUser', newOrderUser); // Use the category routes

const newRoutes = require('./routes/new');
app.use('/api/new', newRoutes); // Use the new routes


const testing = require('./routes/testing');
app.use('/api/testing', testing); // Use the new routes


const homepageRoutes = require('./routes/homepage');
app.use('/api/homepage', homepageRoutes); // Use the new routes

const subcategoryRoutes = require('./routes/subcategory');
app.use('/api/subcategory', subcategoryRoutes);


// Main Database connection
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Main Database Connection Is Ready...');
    // Start the server
    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('Main Database connection error:', err);
});
