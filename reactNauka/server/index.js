const express =require('express');
const app = express()
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        orygin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection" ,(socket)=>{
    console.log("dol")

    socket.on('message',(message)=>{
        io.emit('message',message)
        console.log("shit")
    })
    socket.on('users',(data)=>{
        io.sockets.emit('users',data)
    })

})

server.listen(3001, ()=>{
    console.log("slucham")
})
/*const http = require('http').createServer();


const io = require('socket.io')(http,{
    cors:{orygin:"*"}
})

io.on('connection',(socket)=>{
    console.log('connected')
    socket.on('message',(message)=>{
        console.log(message)
        io.emit('message',message)
    })
    socket.on('users',(data)=>{
        io.sockets.emit('users',data)
    })
})

http.listen(process.env.PORT || 3000,()=>console.log("slucham"))*/
