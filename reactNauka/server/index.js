const express =require('express');
const app = express()
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");

app.use(cors());

const server = http.createServer(app)

let AllUsersList=[]

const io = new Server(server,{
    cors:{
        orygin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection" ,(socket)=>{
    console.log("dol")
//emit all users list
    socket.on('message',(message)=>{
        io.emit('message',message)
    })


    socket.on('userIn',(data)=>{
        //io.sockets.emit('users',data)
        AllUsersList.push(data)
        console.log(data)
    })
    socket.on('userOut',(data)=>{
        //io.sockets.emit('users',data)
        console.log(data)
        for( var i = 0; i < AllUsersList.length; i++){ 
            if ( AllUsersList[i]==data) { 
                AllUsersList.splice(i, 1); 
            }
        }
        console.log(data)
        io.sockets.emit("users",AllUsersList)
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
