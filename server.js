const WebSocket = require('ws');
const express = require('express');

const app = express();

// Serve the client-side files
app.use(express.static('public'));

const server = app.listen(3000, () => {
  console.log('Chat app server listening on port 3000');
});

const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  // Add the new client to the set
  clients.add(ws);

  // Handle messages from the client
  ws.on('message', (message) => {
    // Broadcast the message to all connected clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    clients.delete(ws);
  });
});
