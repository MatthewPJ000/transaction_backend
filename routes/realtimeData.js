const express = require('express');
const router = express.Router();
const getRealtimeData = require('../utils/websocket')

router.post('/', async (req, res) => {
    const forexData = req.body;

    try {
        const Data = await getRealtimeData(forexData.toString());
        console.log(Data)
        res.status(200).json(Data);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;