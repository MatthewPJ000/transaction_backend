const Transaction = require('../models/Transaction');

// Get all transactions
const getTransactions = (req, res) => {
    Transaction.find() // Fetch all transactions from MongoDB
        .then(transactions => {
            
            res.json(transactions);
        })
        .catch(error => {
            console.error('Error fetching transactions:', error.message);
            res.status(500).json({ message: error.message });
        });
};

// You can add more controller functions here (e.g., create, update, delete)

// Export the controller functions
module.exports = {
    getTransactions,
    // Add other controller functions here if needed
};
