import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

dotenv.config()
const port = process.env.PORT
const app = express();
const server = http.createServer(app)

app.use(cors())

const io = new Server(server,{
    cors:{
        // origin: 'https://pinoy-eight.vercel.app',
        origin: 'http://localhost:5173',
        methods: ['GET','POST','HEAD','DELETE','UPDATE']
    }
})

io.on('connection', (socket) => {
    console.log(`Connected to ${socket.id}`);
  
    // Join room
    socket.on('joinRoom', (chatKey) => {
      console.log(`${socket.id} is joining room: ${chatKey}`);
      socket.join(chatKey);
    });
  
    // Send message to the specific room
    socket.on('sendMessage', (data) => {
      console.log(`Message received ${data.message}`);
      socket.to(data.chatKey).emit('receiveMessage', data.message)
    });
  
    // On disconnection
    // socket.on('disconnect', () => {
    //   console.log(`${socket.id} disconnected`);
    // });
  });

server.listen(port,()=>{
    console.log(`listening on port https://localhost:${port}`)
})
