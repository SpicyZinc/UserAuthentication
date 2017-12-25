'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	assign = require('object-assign');

const io = require('socket.io')();

var i = 0;
io.on('connection', (client) => {
	client.emit('timer', new Date());
});

io.on('connection', (client) => {
	client.on('subscribeToRegisterEvent', (interval) => {
		console.log('client is subscribing to fake register events', interval);
		setInterval(() => {
			client.emit('registration', 'A new user number ' + (++i) + ' signed up');
		}, interval);
	});
});

var localStorage = require('node-persist');
localStorage.init();

var jwt = require('jsonwebtoken');


var data = {},
	id = 0,
	app = express();

app.set('superSecret', 'ilovejwt');

app.use(bodyParser());

// enable CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Max-Age', 7200);
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});


app.use(express.static(__dirname + '/public'));


app.get('/user', function(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['Authorization'];
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json(401, { success: false, message: 'Failed to authenticate token.' });    
			} else {
				console.log(decoded);
				let users = localStorage.values();
				let email = decoded.email;
				let matchedUsers = users.filter((user) => (user.email === email));
				let user = matchedUsers.length ? matchedUsers[0] : null;
				if (user ===  null) {
					res.json(404, { 
						success: false, 
						message: 'No user found.' 
					});
				} else {
					user.token = token;
					res.json(200, user);
				}
			}
		});
	} else { // if there is no token, return an error
		res.json(403, { 
			success: false, 
			message: 'No token provided.' 
		});
	}
});


app.post('/login', function(req, res, next) {
	let info = req.body;
	let success = false;

	localStorage.forEach(function(key, user) {
		if (user && user.account === info.account && user.password === info.password) {
			success = true;
			let token = jwt.sign(user, app.get('superSecret'));
			user.token = token;
			res.json(200, user);
		}
	});

	!success && res.json(404, { error: 'Account or password is incorrect!' });
});


app.post('/signup', (req, res, next) => {
	var user = req.body;
	localStorage.forEach(function(key, item) {
		console.log(key, item);

		if (item && item.email === user.email) {
			res.json(409, {
				success: false,
				message: 'Check the form for errors.',
				errors: {
					email: 'This email is already taken.'
				}
			});
		}
	});


	if (Object.keys(user).length) {
		user.id = ++id;
		localStorage.setItem(user.email, user);
		console.log('Created user' + JSON.stringify(user));

		res.json(200, user);
	} else {
		console.log('No data found in request body; no user created.');
		res.json(500, { error: 'No data found in request body.' });
	}
});


app.post('/edit', (req, res, next) => {
	var user = req.body;
	let found = false;
	localStorage.forEach(function(key, item) {
		console.log(key, item);

		if (item && item.email === user.email) {
			found = true;
			localStorage.setItem(key, user)	
			console.log('Updated user' + JSON.stringify(user));
			res.json(200, user);
		}
	});
	!found && res.json(500, { error: 'No data found in request body.' });
});


app.post('/delete', (req, res, next) => {
	var user = req.body;
	let removed = false;
	localStorage.forEach(function(key, item) {
		console.log(key, item);

		if (item && item.email === user.email) {
			removed = true;
			localStorage.removeItem(key);	
			console.log('Removed user' + JSON.stringify(user));
			res.json(200, {});
		}
	});
	!removed && res.json(500, { error: 'No user found local storage.' });
});


app.listen(9898);
console.log('Started listening on port 9898');

const port = 8000;
io.listen(port);
console.log('socket listening on port ', port);