const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb+srv://admin:mc2jhQRy4jP8mZyG@mern-hotel-booking.hq0m3.mongodb.net/transaction-web')
    .then(() => {
        console.log('MongoDB connected...');
    })
    .catch(err => {
        console.error(err.message);
        process.exit(1); // Exit the process if the connection fails
    });
};

module.exports = connectDB;
