const io = require('socket.io')();

io.on('connection', socket => {

  // all socket listener here
  socket.on("send-message", (data) => {
    io.emit("room-detail", data);
  });
  socket.on("typing-start", (data) => {
    io.emit("typing-start", data);
  });
});

module.exports = io;