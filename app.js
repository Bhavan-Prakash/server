

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 


const newDbConnection = require('./dbNewConnection');


app.use(cors()); 
app.use(express.json()); 


const categoryRoutes = require('./routes/categories');
app.use('/api/category', categoryRoutes); 

const emailRoutes = require('./routes/emailRoutes');
app.use('/api/mail', emailRoutes); 

const reducer = require('./routes/reducer');
app.use('/api/reducer', reducer); 
const reducercategory = require('./routes/reducescategory');
app.use('/api/reducercategory', reducercategory); 


const returnUser = require('./routes/returnUser');
app.use('/api/returnUser', returnUser); 
const newOrderAdmin = require('./routes/newOrderAdmin');
app.use('/api/newOrderAdmin', newOrderAdmin); 
const newOrderUser = require('./routes/newOrderUser');
app.use('/api/newOrderUser', newOrderUser);
const newRoutes = require('./routes/new');
app.use('/api/new', newRoutes); 

const testing = require('./routes/testing');
app.use('/api/testing', testing); 


const homepageRoutes = require('./routes/homepage');
app.use('/api/homepage', homepageRoutes);

const subcategoryRoutes = require('./routes/subcategory');
app.use('/api/subcategory', subcategoryRoutes);



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Main Database Connection Is Ready...');

    app.listen(process.env.PORT, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('Main Database connection error:', err);
});
