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
import { getDatabase, ref, onValue, push, onDisconnect, set } from "firebase/database";


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
    
//currentUser


    

 return (
   



  <>

    <p style={{margin:'25px 25px 25px 25px' ,color:'white',textAlign:'center'}}>{timestamp}</p>
  <div  ref={re1f} className={`message1-chat ${message.senderId===currentUser.uid&&"owner"}`} >
  <div className='aside'>
  <div className='cont'>
  <div className='message' >

  <img src={message.senderId===currentUser.uid?currentUser.photoURL:data.user.photoURL} alt='fuuu'></img>
 
  <div className='image'>
    {message.img&&<img src={message.img}alt=""/>}
    <div className='box'>

    
  <p>{message.text}</p>
  <div className='set_date'>
  <p style={{marginLeft:'40px',textAlign:'end',fontSize:'14px'}}>{ message.senderId===currentUser.uid?date.toLocaleTimeString('en-us'):date.toLocaleTimeString('en-us')}</p>
  </div>
  </div>
    
  </div>

 
  </div>
  </div>
  </div>
 </div>

</>
  )
  }
  
 
export default MessagePanel1;
 


