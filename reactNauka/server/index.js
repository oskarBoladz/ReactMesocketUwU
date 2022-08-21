const express =require('express');
const app = express()
const http = require("http");
const { Server } = require("socket.io")
const cors = require("cors");



app.use(cors());

const server = http.createServer(app)

let AllUsersList=[]
let NusL=[]
const io = new Server(server,{
    cors:{
        orygin:"https://quiet-ravine-04524.herokuapp.com/",
        methods:["GET","POST"]
    }
})

io.on("connection" ,(socket)=>{
    console.log("dol")
//emit all users list
    socket.on('message',(message)=>{
        
        io.emit('message',message)
        console.log(message)
    })

//npm run devStart w /server żeby to jebane guwno odpalić //sudo npm install -g nodemon --unsafe-perm//
//a na końcu komenda jak by kiedy indeziej nie działało 
    socket.on('userIn',(data)=>{
        //io.sockets.emit('users',data)
        if(!(AllUsersList.some(x => x==data))){
        AllUsersList.push(data)}
        io.emit('updateUserList',AllUsersList)
        //console.log(data , AllUsersList) // w huj ważne
    })
    
    socket.on("disconnect",()=>{
        
        AllUsersList.length=0
        io.emit('ptw',"data")
        
    })


})


server.listen(process.env.PORT || 3001, ()=>{
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
