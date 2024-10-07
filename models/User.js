const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Add this line for the id field
    username: { type: String, required: true },
    email: { type: String, required: true },
    walletBalance: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});


// Create the User model
const User = mongoose.model('users', userSchema);

module.exports = User;
