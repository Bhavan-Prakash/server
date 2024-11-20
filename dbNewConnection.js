// dbNewConnection.js
const mongoose = require('mongoose');

const newDbConnection = mongoose.createConnection(process.env.NEW_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

newDbConnection.on('connected', () => {
    console.log('New Database Connection Is Ready...');
});

newDbConnection.on('error', (err) => {
    console.error('New Database connection error:', err);
});

module.exports = newDbConnection;
