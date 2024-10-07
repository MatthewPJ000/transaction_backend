// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Use the controller to handle the GET request
router.get('/transactions', transactionController.getTransactions);

module.exports = router;
