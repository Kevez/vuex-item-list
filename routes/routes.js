var express = require('express');
var router = express.Router();
var items = require('../data/items');

router.get('/items', (req, res) => {
	res.send(items);
});

router.post('/add-item', (req, res) => {
	items.push({
		id: items.length + 1,
		name: req.body.name,
		parent: req.body.parentToAddTo
	});

	res.send(items);
});

router.post('/update-item', (req, res) => {
	var item = items.filter((item) => {
		return item.id ===  req.body.id;
	})[0];

	item.name = req.body.name;
	res.send(items);
});

router.post('/remove-item', (req, res) => {
	var item = items.filter((item) => {
		return item.id === req.body.id;
	})[0];

	items.splice(items.indexOf(item), 1);
	res.send(items);
});

module.exports = router;
