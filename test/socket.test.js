
const io = require('socket.io-client');
const server = require('../socketConfig');

describe('Suite of unit tests', function () {
  //ngejalain servernya
  server.attach(3010);
  // let sender;
  // let receiver;
  let socket;

  beforeAll(function (done) {
    // Setup
    socket = io.connect('http://localhost:3010', {
      'reconnection delay': 0
      , 'reopen delay': 0
      , 'force new connection': true
    });

    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    });
  });

  afterAll(function (done) {
    // Cleanup
    socket.close();
    done();
  });

  describe('Chat tests', function () {
    test('Sending message to the chat', (done) => {
      const data = {
        roomName: 'Teknologi Informasi',
        sender: 'Budi',
        message: 'test message',
        name: 'Irham'
      };

      socket.emit('send-message', data);

      socket.on('room-detail', dataRes => {
        expect(dataRes).toBeInstanceOf(Object);
        expect(dataRes).toHaveProperty('name');
        done();
      });
    });

    test('Show typing message', (done) => {
      let payload = {
        room: 'Teknologi Informasi',
        name: 'Budi'
      };
      socket.emit('typing-start', payload);

      socket.on('typing-start', data => {
        expect(data.name).toBe(payload.name);
        done();
      });
    });

  });

});

