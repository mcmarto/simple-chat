const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

server.listen(process.env.PORT || 3000);

// Exposes the folder frontend
app.use(express.static(__dirname + '/frontend/dist'));

io.on('connection', function (socket) {
    socket.emit('test-event', { hello: 'world' });
    socket.on('another-event', function (data) {
        console.log(data);
    });
});