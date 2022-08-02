import React from 'react';
import {createRoot} from "react-dom/client"
import './index.css'

import io from 'socket.io-client'

//import logo from "./likeButton.jpg"
//import {MainContent} from "./MainContent.js"
const socket = io.connect('http://localhost:3001');

const container = document.getElementById('root')
const root= createRoot(container)

let userData={
  nick:null,
  room:null
}

while(true){
  let nick=prompt("nick: ")
  if(nick.length<=12){
    userData.nick=nick;
    break;
  }
}

while(true){
  let room=prompt("room: ")
  if(room.length==4 && !isNaN(room)){
    userData.room=room;
    break;
  }
}


socket.emit('users',userData.nick)
function AllPage(){

const [messageAll, setThingsArray] = React.useState([])


socket.on('users',data=>{
  console.log(data)
})

function BtnSend(){
  console.log("huj")
  if(document.getElementById('mesage').value!=""){
    socket.emit('message',{message:document.getElementById('mesage').value,nick:userData.nick})
    console.log("huj2")
    document.getElementById('mesage').value=""
  }
}

function addMessage(nickk,textt,clases){
  console.log("messageQWE")
  setThingsArray(prevState =>[...prevState,{nick:nickk,text:textt,clases:clases}])//https://www.youtube.com/watch?v=bMknfKXIFA8&t=2961s // 6:09:46
  console.log(messageAll)
}

socket.once('message',data=>{
  console.log("huj3")
  let clases="hisMessage"
  if(data.nick==userData.nick){
    clases="myMessage"
  }
  addMessage(data.nick,data.message,clases)

/*
if(data.nick!=userData.nick){
  NewMessage(data.nick,data.message,"hisMessage")
}else
{NewMessage(data.nick,data.message,"myMessage")}
  
})

function NewMessage(user,text,className){
    var newMessage=document.createElement('div')
    newMessage.className=className
    newMessage.innerHTML="<i>"+user+"</i><br>"+text
    document.getElementById("ChatWindow").appendChild(newMessage)
    //npm start    || node .
    console.log(user,text)

const msg=(
      <div class={className}>
        <i>{user}</i><br/>
        {text}
      </div>
    )
  else{
    var newMessage=document.createElement('div')
    newMessage.className="hisMessage"
    newMessage.innerHTML=user+"<br>"+text
    document.getElementById("ChatWindow").appendChild(newMessage)
    console.log(user,text)
  }*/
    
})
//<div class="hisMessage"><i>{thing.nick}</i><br/>{thing.text}</div>
const AllMessageSetSet = messageAll.map(thing => (
<div key={messageAll.length} className={thing.clases}>
{thing.nick}<br/>
{thing.text}
</div>
)
)

function AllMessageSet(){
  return <div>{AllMessageSetSet}</div>
}

function NickBar(){
  return(
    <div id="NickBar"><h1>123456789012</h1></div>
  )
}
function ChatWindow(){
  return(
  <div id="ChatWindow">
    <AllMessageSet />
  </div>
  )
}
function UserInput(){
  return(
  <div id="UserInput">
    <input type="text" id="mesage" placeholder="message"/><button id="send" onClick={BtnSend}>Send</button>
  </div>
    )
}
function Footer(){
  return(
  <div id="Footer">
  Just footer
  </div>
    )
}




  return(
  <div id="allPage">
    <NickBar />
    <ChatWindow />
    <UserInput />
    <Footer />
  </div>)
}



root.render(<AllPage />)