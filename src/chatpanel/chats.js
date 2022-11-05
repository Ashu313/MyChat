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
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { Offline } from 'react-online-status';
import { Online } from 'react-online-status';
const lastSeenAgo=require('last-seen-ago');



const Chats = ({setPhoneView1,message}) => {
  
  

  const {currentUser}=useContext(AuthContext);
  const [chat,setChat]=useState([]);
  const [text,setText]=useState("");
  const [note,setNote]=useState(0);
 
  const{dispatch}=useContext(ChatContext);
  const {data}=useContext(ChatContext);
 //var uid=auth.currentUser.uid;
 const [user, setUser] = useState(null);

 console.log(currentUser.uid+data.user.uid);

 

 useEffect(()=>{
  const getChats=()=>{
    console.log("jnd");
    const refresh=onSnapshot(doc(db,'usersChats',String(currentUser.uid)),(doc)=>{
      //console.log('current-data',doc.data());
      setChat(doc.data());
    });

    return()=>{
      refresh();
    }
  };
  currentUser.uid && getChats();
  
},[currentUser.uid]);






//console.log(chat[1].userinfo.displayName)



// Since I can connect from multiple devices or browser tabs, we store each connection instance separately
// any time that connectionsRef's value is null (i.e. has no children) I am offline


const value=async()=>{
  const combineId =currentUser.uid > data.user.uid ? currentUser.uid + data.user.uid : data.user.uid + currentUser.uid;
  const res =  await getDoc(doc(db, 'chats', combineId));
  console.log(res);
  console.log(currentUser.uid);
  //console.log(user.uid);
  console.log(res.exists() ? 'true' : 'false');
  try {


    if (!res.exists()) {
   
      

   
      console.log(res);
     
    
    updateDoc(doc(db, 'usersChats', String(currentUser.uid)),
       {
       
        [combineId + ".userinfo"]: {
          uid: data.user.uid,
         
          displayName: data.user.displayName,
          photoURL: data.user.photoURL,
          email:data.user.email,
          status:data.user.status,
       
       
          





        },
        [combineId + ".date"]: serverTimestamp(),

      });
      console.log("user update hua");
      updateDoc(doc(db, 'usersChats', String(data.user.uid)),
       {
      
        [combineId + ".userinfo"]: {
          uid: currentUser.uid,
         
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
             email:currentUser.email,
             status:currentUser.status?'online':'unavailable',
            
             
           
        


        },
        [combineId + ".date"]: serverTimestamp()
        
      });

      console.log("dhdhd");

    }
    else{

     updateDoc(doc(db, 'usersChats', String(currentUser.uid)),
      {
      
       [combineId + ".userinfo"]: {
         uid: data.user.uid,
        
         displayName: data.user.displayName,
         photoURL: data.user.photoURL,
         email:data.user.email,
         status:new Date().toDateString()+' '+new Date().toLocaleTimeString(),
      
      
         





       },
       [combineId + ".date"]: serverTimestamp(),

     });
     console.log("user update hua");
  updateDoc(doc(db, 'usersChats', String(data.user.uid)),
      {
     
       [combineId + ".userinfo"]: {
         uid: currentUser.uid,
        
         displayName: currentUser.displayName,
         photoURL: currentUser.photoURL,
            email:currentUser.email,
            status:currentUser.status?'online':'unavailable',
           
            
          
       


       },
       [combineId + ".date"]: serverTimestamp()
       
     });
   

    }
  }
  catch (err) {
    
    console.log(err);
    console.log("jjnjnjj");
  
}

}



  console.log("chdhhf");
  const handleSelet= (u)=>{
    
  
  
  

dispatch({type:'CHANGE_USER',payload:u})


  }
  console.log("ddhdhd");


let count =0; 


  return (

    <>
    
    <section className='discussions'style={{width:'100%'}}>

    {  Object.entries(chat)?.sort((a,b)=>a[1].date?.date-b[1].date?.date).map((chats)=>(
    
   
    <div class='discussion' key={chats[0]} /*onClick={()=>handleSelet(chats[1].userinfo)} */ onClick={() => {
  console.log(chats[1].userinfo);
      handleSelet(chats[1].userinfo)
      setPhoneView1(false)
     
     
      
    }}>
     
      
          


      <div class="photo" style={{backgroundImage:`url(${chats[1].userinfo.photoURL})`}}>   
   
<div class="online">

</div>
</div>
      <div class="desc-contact">
        <p class="name">{chats[1].userinfo.displayName}</p>
        <p class="message">{chats[1].lastmessage?.text}</p>
     
      </div>

      <div class="timer" style={{color:'black'}}>{lastSeenAgo.getLastSeen(chats[1].date===Timestamp?"heheheh":chats[1].date?.date)}</div>
    </div>
   
    ))}
   
    
  

 

 
  </section>

    </>
  )
}


export default Chats;