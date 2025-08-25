const WebSocket = require('ws');
const dotenv = require('dotenv');
dotenv.config();

const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        // Broadcast message to all clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log(`WebSocket server is running on ws://localhost:${process.env.WS_PORT || 8080}`);
