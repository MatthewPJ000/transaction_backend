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

// register user

const registerUser = async (req, res) => {
    try {
        // Extract data from request body
        const { id, username, email, walletBalance } = req.body;

        // Validate that all required fields are present
        if (!id || !username || !email || walletBalance === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists." });
        }

        // Create a new user instance
        const newUser = new User({
            id,
            username,
            email,
            walletBalance
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        return res.status(201).json({ message: "User registered successfully!", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Server error. Please try again later." });
    }
};
// Export the controller functions
module.exports = {
    getUsers,
    registerUser,
};
