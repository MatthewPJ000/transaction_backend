// controllers/userController.js
const User = require('../models/User');

// Get all users
const getUsers = (req, res) => {
    User.find() // Fetch all users from MongoDB
        .then(users => {
            res.json(users); // Return users as JSON
        })
        .catch(error => {
            res.status(500).json({ message: error.message }); // Handle any errors
        });
};

// Export the controller functions
module.exports = {
    getUsers,
};
