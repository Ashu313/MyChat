import React from 'react'
import { useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { collection, query, where, getDocs, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { app, db } from '../Firebase';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../contextApi/contextapi';
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { useReducer } from 'react';
import { object } from 'prop-types';
import { getDatabase, onDisconnect, onValue, push, ref, set } from 'firebase/database';
import Messages from './messages';
import { Firestore } from 'firebase/firestore';
import { ChatContext } from '../contextApi/chatContext';
import { database } from '../Firebase';
import { auth } from '../Firebase';
import { Auth } from 'firebase/auth';
import { OnDisconnect } from 'firebase/database';
//import timestamp
import { Timestamp } from 'firebase/firestore';
const lastSeenAgo=require('last-seen-ago');



const Chats = ({setPhoneView1,message}) => {
  
  

  const {currentUser}=useContext(AuthContext);
  const [chat,setChat]=useState([]);
 
  const{dispatch}=useContext(ChatContext);
 //var uid=auth.currentUser.uid;

console.log("chdhhf");

//console.log(chat[1].userinfo.displayName)



// Since I can connect from multiple devices or browser tabs, we store each connection instance separately
// any time that connectionsRef's value is null (i.e. has no children) I am offline



  useEffect(()=>{
    const getChats=()=>{
      console.log("jnd");
      const refresh=onSnapshot(doc(db,'usersChats',currentUser.uid),(doc)=>{
        //console.log('current-data',doc.data());
        setChat(doc.data());
      });
  
      return()=>{
        refresh();
      }
    };
    currentUser.uid && getChats();
    
  },[currentUser.uid]);




  console.log("chdhhf");
  const handleSelet=(u)=>{
    
dispatch({type:'CHANGE_USER',payload:u})
  }
  

const  realTime=1664856683;
const lastSeen = lastSeenAgo.getLastSeen(realTime);
//console.log(chat[1].date.date);
 
//print output will be "34 minutes ago"
console.log(lastSeen)
const {data}=useContext(ChatContext);


  return (

    <>
    
    <section className='discussions'style={{width:'100%'}}>

    
   {  Object.entries(chat)?.sort((a,b)=>a[1].date-b[1].date).map((chats)=>(
    
   
    <div class='discussion' key={chats[0]} /*onClick={()=>handleSelet(chats[1].userinfo)} */ onClick={() => {
      handleSelet(chats[1].userinfo)
      setPhoneView1(true)
    }}>

    <div class="photo" style={{backgroundImage:`url(${chats[1].userinfo.photoURL})`}}>   

         <div class="online">
      
         </div>
      </div>
      <div class="desc-contact">
        <p class="name">{chats[1].userinfo.displayName}</p>
        <p class="message">{chats[1].lastmessage?.text}</p>
      </div>
      <div class="timer" style={{color:'black'}}>{lastSeenAgo.getLastSeen(chats[1].date?.date)}</div>
    </div>
   
    ))}
    
   {/* <div class="discussion">
    <div class="photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);"}}>      </div>
      <div class="desc-contact">
        <p class="name">Jerome Seiber</p>
        <p class="message">I've sent you the annual report</p>
      </div>
      <div class="timer">42 min</div>
    </div>

    <div class="discussion">
    <div class="photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);"}}>        <div class="online"></div>
      </div>
      <div class="desc-contact">
        <p class="name">Thomas Dbtn</p>
        <p class="message">See you tomorrow ! 🙂</p>
      </div>
      <div class="timer">2 hour</div>
    </div>

    <div class="discussion">
    <div class="photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);"}}>      </div>
      <div class="desc-contact">
        <p class="name">Elsie Amador</p>
        <p class="message">What the f**k is going on ?</p>
      </div>
      <div class="timer">1 day</div>
    </div>

    <div class="discussion">
    <div class="photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);"}}>      </div>
      <div class="desc-contact">
        <p class="name">Billy Southard</p>
        <p class="message">Ahahah 😂</p>
      </div>
      <div class="timer">4 days</div>
    </div>

    <div class="discussion">
      <div class="photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);"}}>
        <div class="online"></div>
      </div>
      <div class="desc-contact">
        <p class="name">Paul Walker</p>
        <p class="message">You can't see me</p>
      </div>
      <div class="timer">1 week</div>
  </div>*/}
 
  </section>

    </>
  )
}


export default Chats;