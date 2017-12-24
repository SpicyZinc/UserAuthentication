import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:8000');

export default function subscribeToFakeEvent(cb) {
	socket.on('registration', event => cb(null, event));
	socket.emit('subscribeToRegisterEvent', 30000);
}
