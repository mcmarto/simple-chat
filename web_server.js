const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// Exposes the folder frontend
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

io.on('connection', function (socket) {
    socket.emit('test-event', { hello: 'world' });
    socket.on('another-event', function (data) {
        console.log(data);
    });
});

server.listen(process.env.PORT || 80, () => {
	console.log(`Server is listening on port: ${server.address().port}`);
});
