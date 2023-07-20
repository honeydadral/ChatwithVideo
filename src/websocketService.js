import io from 'socket.io-client';

const socket = io('http://localhost:3000/');

const subscribeToChat = (callback) => {
  socket.on('chat-message', (message) => {
    callback(message);
  });
};

const sendMessage = (message) => {
  socket.emit('send-message', message);
};

export { subscribeToChat, sendMessage };
