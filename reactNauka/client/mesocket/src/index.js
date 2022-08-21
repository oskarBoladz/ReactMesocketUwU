import React from 'react';
import {createRoot} from "react-dom/client"
import {useEffect, useState} from 'react';

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

let alUsers=[]

let pmes=""

while(true){
  let nick=prompt("nick: ")
  if(nick.length<=13){
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


socket.emit('userIn',userData.nick)

function AllPage(){

const [messageAll, setThingsArray] = React.useState([])

const [usersAllbox, setUsers]=React.useState([])


function BtnSend(){

  if(document.getElementById('mesage').value!=""){
    socket.emit('message',{message:document.getElementById('mesage').value,nick:userData.nick,dateS:userData.nick+(new Date())})
    document.getElementById('mesage').value=""
  }
}

function addMessage(nickk,textt,clases){
  console.log("karaczan")
  setThingsArray(prevState =>[...prevState,{nick:nickk,text:textt,clases:clases,key:nickk+" "+(new Date())}])//https://www.youtube.com/watch?v=bMknfKXIFA8&t=2961s // 6:09:46
}

socket.on('message',(data)=>{//once
  if(!(pmes==data.dateS)){
  let clas="hisMessage"
  if(data.nick==userData.nick){
    clas="myMessage"
  }
  console.log(data)
  addMessage(data.nick,data.message,clas)
}
pmes=data.dateS
})
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
      <div className={className}>
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
    

//<div class="hisMessage"><i>{thing.nick}</i><br/>{thing.text}</div>
const AllMessageSetSet = messageAll.map(thing => (
<div key={thing.key} className={thing.clases}>
<i>{thing.nick}</i><br/>
{thing.text}
</div>
)
)
// tam do gury mimo że jest nowa data to i tak sie pierdoli to problem z on zmieniłam na once ale dalej w rekcie sie pierdoli
function AllMessageSet(){
  return <div>{AllMessageSetSet}</div>
}

// function UserBoxWindow(){
//   return(
//   //<div class="UserBoxWindow" key={nick}><h1>{nick}</h1></div>
//   <div class="UserBoxWindow">1234567890123</div>
//   )
// }

function NickBar(){
  return(
    <div id="NickBar" key="NickBark">
      <UserBoxWindow />
    </div>
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
  Just footer with no data in it ¯\_(ツ)_/¯
  </div>
    )
}



// const UseOnPageLeave = (handler) => {
//   useEffect(() => {
//     window.onbeforeunload = () => handler();

//     window.addEventListener('beforeunload', (event) => {
//       handler();
//     });

//     return () => {
//       handler();
//       document.removeEventListener('beforeunload', handler);
//     };
//   });
// };
const AllUsersSet = usersAllbox.map(thing => (
  <div className="UserBoxWindowT" key={thing}>{thing}</div>
  )
  )

function UserBoxWindow(){
  return <div key="AllUsersSetK">{AllUsersSet}</div>
}

socket.once('updateUserList',data=>{
  alUsers=data//tu daje pierdolenie o dodawaniu użytkownikuw z boku ale bez{...} mam nadzieje że bede wiedzdiał o co mi chodziło
  console.log(alUsers)
  setUsers(alUsers)//https://www.youtube.com/watch?v=bMknfKXIFA8&t=2961s // 6:09:46
})

socket.once('ptw',(data)=>{
  if(data=="data"){
    
    socket.emit('userIn',userData.nick)
  }
})

  return(
  <div id="allPage">
    <NickBar />
    <ChatWindow />
    <UserInput />
    <Footer />
  </div>)
}



root.render(<AllPage />)


//huj nie działa before the unload react żeby nick wykreślić


//npm start // jak by to wyjebał i musiał kiedyś wrucić xd // start nie kurwa run run jest dla serweda 