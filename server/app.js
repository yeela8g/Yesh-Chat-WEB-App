const express = require('express');
const server = express();

const http = require('http');
const app = http.createServer(server);

const { Server } = require("socket.io");
const io = new Server(app);

const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }));

const path = require('path');

const cors = require('cors');
const corsOptions = {
    origin: "https://social-chat-app-23.onrender.com", // frontend URI (ReactJS)
}
server.use(cors(corsOptions));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL
, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(express.json({ limit: '25mb' }));

server.use(express.static(path.join(__dirname, 'build')));
server.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
server.get('/chats', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


const routerUsers = require('./routes/Users.js');
server.use('/api/Users', routerUsers);

const routerTokens = require('./routes/Tokens.js');
server.use('/api/Tokens', routerTokens);

const routerChats = require('./routes/Chats.js');
server.use('/api/Chats', routerChats);

const socketUserMap = new Map();

io.on('connection', (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on('login', (data) => {
    console.log('inside login');
    const username = data.username;
    socketUserMap.set(username, socket); // Map the socket to the user's username
    console.log(`${username}'s socket has been mapped:` + socketUserMap.get(username).id);
  });

  socket.on('message', (data) => {
    console.log('inside message');
    // // Handle the message event here
     console.log(`Received message: ${data.msg} from ${JSON.stringify(data.user)}`);
    // // You can broadcast the message to other clients in the same room
    const contactSocket = socketUserMap.get(data.contact);
    if(contactSocket !== undefined){ //IF BECAUSE contact may not be loggedIN
      console.log(`sending to ${data.contact} in the socket.id ${contactSocket.id} and alert..`)
      contactSocket.emit('alert',{userSender:data.user, msg:data.msg});
    }
  });

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnecting triggered`);
  });
});



app.listen(process.env.PORT);

