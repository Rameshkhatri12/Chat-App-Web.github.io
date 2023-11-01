// const { Socket } = require('socket.io');

//NodeServer Which Will Handle Socket.io Connections.
const io = require('socket.io')(3000);
console.log('server is live');
const users = {};

// .on() is a event in javaScript
// This following event gives two arguments, first is 'connection' which means on connection. and second is socket.
io.on('connection',socket =>{
    //If Any New User Joins, Let Other users Connected to the server Know!
    socket.on('new-user-joined', name =>{
        // console.log('new-user-joined', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    // If Someone sends a message, Broadcast it to all people Which are live on the Server!
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message, name:users[socket.id]});
    });
    // If someone leaves the Chat, Let Other users Connected to the server Know!
    socket.on('disconnect',message =>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id];
    });
});