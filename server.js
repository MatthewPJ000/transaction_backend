const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/userRoutes');
const transactionsRoute = require('./routes/transactionRoutes');
const cors = require('cors'); // Import the cors package
// const connectWebsocket = require('./utils/websocket')
const app = express();


// Connect Database
connectDB();
// connectWebsocket()


// Init Middleware
app.use(bodyParser.json({ extended: false }));
app.use(cors()); // Use the cors middleware

// Define Routes
app.use(usersRoute);
app.use(transactionsRoute);
app.use('/api/user', usersRoute);
app.use('/api/trading', transactionsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));