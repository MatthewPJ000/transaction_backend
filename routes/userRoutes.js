// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Use the controller to handle the GET request
router.get('/getAllUsers', userController.getUsers);
router.post('/register', userController.registerUser)

module.exports = router;
