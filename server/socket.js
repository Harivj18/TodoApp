<<<<<<< HEAD
const socketio = require('socket.io');
const messages = require('./controllers/messageController')

const socketConnection = (server) => {
    const io = socketio(server, {
        cors: {
            origin: ["http://localhost:3000","http://localhost:3001"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connect', (socket) => {
        console.log('Socket Connected to Server Successfully', socket.id);

        socket.on('message', (message) => {
            console.log('User Message', message);
            messages.sentMessage(message)
            socket.to(message.room).emit("response", message);
        });

        socket.on('join_room', (roomId) => {
            console.log('Room Joined', roomId);
            socket.join(roomId);
        });

        socket.on('leave_room', (roomId) => {
            console.log('leave_room', roomId);
            socket.leave(roomId);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected from the server', socket.id);
        });
    });
=======
const socketIo = require('socket.io');

const socketConnection = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      socket.emit('response', `You said: ${message}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
>>>>>>> 7ee871d63b560feec2c87a18202b08a427c13e74
};

module.exports = socketConnection;
