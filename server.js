const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 7777;
const routes = require('./routes/routes');
var items = require('./data/items');

app.use(bodyParser());
app.use(cors());
app.use('/', routes);

io.on('connection', (socket) => {
	socket.on('addItem', (payload) => {
		socket.broadcast.emit('refreshItemList', items);
		io.emit('itemUpdated', `${payload.name} added`);
	});

	socket.on('editItem', (payload) => {
		socket.broadcast.emit('refreshItemList', items);
		io.emit('itemUpdated', `${payload.prevName} updated to ${payload.name}`);
	});

	socket.on('removeItem', (payload) => {
		socket.broadcast.emit('refreshItemList', items);
		io.emit('itemUpdated', `${payload.name} removed`);
	});
});

http.listen(port, function () {
	console.log(`Server listening on localhost:${port}`);
});