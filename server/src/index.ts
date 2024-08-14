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
        origin: 'https://pinoy-eight.vercel.app',
        methods: ['GET','POST','HEAD','DELETE','UPDATE']
    }
})

io.on('connection',(socket)=>{
    console.log(`Connected to ${socket.id}`)

    socket.on('joinRoom',(data)=>{
        socket.join(data)
    })

    socket.on('sendMessage',(data)=>{
        socket.to(data.room).emit('receiveMessage', data)
    })
})

server.listen(port,()=>{
    console.log(`listening on port https://localhost:${port}`)
})
