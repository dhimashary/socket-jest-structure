// const io = require('socket.io')();
const httpServer = require('./bin/http');
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  // all socket listener here
  socket.on('send-message', (data) => {
    console.log(data);
    io.emit('room-detail', data);
  });
  socket.on('typing-start', (data) => {
    io.emit('typing-start', data);
  });
});

module.exports = io;
