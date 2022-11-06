import React, { useState } from 'react'
import { signOut, updateCurrentUser } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { useContext } from 'react'
import  { AuthContext } from '../contextApi/contextapi'
import { useEffect } from 'react'
import { arrayUnion, doc, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'

import { object } from 'prop-types'
import { ChatContext } from '../contextApi/chatContext'
import { uuidv4 } from '@firebase/util'
import "./message.css"
import Chats from './chats'
import Input from './input'
import { useRef } from 'react'
import LastStatus from 'react-last-status/lib/components/LastStatus'
import { getDatabase, ref, onValue, push, onDisconnect, set } from "firebase/database";
import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';



//rafe
const MessagePanel1 = ({message}) => {
  

const {currentUser}=useContext(AuthContext);
//console.log(message)

const re1f=useRef();
useEffect(()=>{
  re1f.current?.scrollIntoView({behavior:'smooth'})
},[message])


const{data}=useContext(ChatContext);
 console.log(data.user.displayName);

let firebaseDate=message.date;
console.log(firebaseDate);
console.log(firebaseDate.seconds);
 var date=new Date(firebaseDate.toDate());
 var formattedDate = date.toLocaleDateString();
 var timestamp =  formattedDate 
 var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
 console.log(newDate);
 
 const [text,setText]=useState("");
 const { speak } = useSpeechSynthesis();
//currentUser

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let name = month[d.getMonth()];
    console.log(d[6])
    const date1=new Date().toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"}) ;

 return (
   




   
 
 <>
  <p style={{margin:'25px 25px 25px 25px' ,color:'white',textAlign:'center'}}>{new Date().toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric"})},   {date.toLocaleTimeString('en-us', {hour: '2-digit', minute:'2-digit'})}</p>
  <div   role='textbox'ref={re1f} className={`message1-chat ${message.senderId===currentUser.uid&&"owner"}`} >
  <div className='aside'>
  <div className='cont'>
  <div className='message' >


<>

  <img src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt='fuuu'></img>

 

    
 
 
  <div className='image'>
  {message.img&&<img src={message.img}alt=""/>}
    <div className='box'>

  
 <p  style={{lineBreak:'anywhere',marginLeft:'10px',fontWeight:'500'}}>{message?.text}</p>

  {message.text!=""&&message.senderId===currentUser.uid?<i class="fa-solid fa-microphone" onClick={() => speak({ text: message.text})} style={{color:"red",position:"absolute",right:'0px',bottom:'20px',fontSize:'20px'}}></i>:<i class="fa-solid fa-microphone" onClick={() => speak({ text: message.text})} style={{color:"red"}}></i>}
  
  <div  className={`set_date ${message.senderId!=currentUser.uid&&"active1"}`}>
  <p >{ message.senderId===currentUser.uid?date.toLocaleTimeString('en-us', {hour: '2-digit', minute:'2-digit'}):date.toLocaleTimeString('en-us', {hour: '2-digit', minute:'2-digit'})}</p>
  </div>
  </div>
    
  </div>
  
 
 </>

  </div>
  </div>
  </div>
 </div>
 
</>
 

 

 )
}
 
export default MessagePanel1;
 


