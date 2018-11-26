const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 7777;

io.on('connection', (socket) => {
	socket.on('addItem', (payload) => {
		socket.broadcast.emit('addItem', payload);
		io.emit('itemUpdated', {
			type: 'add',
			payload: payload
		});
	});

	socket.on('editItem', (payload) => {
		socket.broadcast.emit('editItem', payload);
		io.emit('itemUpdated', {
			type: 'edit',
			payload: payload
		});
	});

	socket.on('removeItem', (payload) => {
		socket.broadcast.emit('removeItem', payload);
		io.emit('itemUpdated', {
			type: 'remove',
			payload: payload
		});
	});
});

http.listen(port, function () {
	console.log(`Server listening on localhost:${port}`);
});