const WebSocket = require('ws');

const reconnectInterval = 10000;

const connect = (forexData) => {
    const ws = new WebSocket('wss://marketdata.tradermade.com/feedadv');

    ws.on('open', function open() {
        const message = JSON.stringify({
            userKey: "ws27bzruXRhK3xHhvknQ",
            symbol: forexData
        });
        ws.send(message);
    });

    ws.on('close', function () {
        console.log('socket close: will reconnect in ' + reconnectInterval);
        setTimeout(() => connect(forexData), reconnectInterval);
    });

    ws.on('message', function incoming(data) {
        if (data !== "Connected") {
            try {
                const parsedData = JSON.parse(data);
                // console.log('Parsed message data:', parsedData);
                return parsedData
            } catch (e) {
                console.error('Error parsing message data:', e.message, 'Received data:', data);
            }
        }
    });

    ws.on('error', function error(err) {
        console.error('WebSocket error:', err);
    });
};

module.exports = connect;