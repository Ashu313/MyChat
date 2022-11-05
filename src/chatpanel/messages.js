

import { useEffect } from "react";
import React, { useState } from 'react'


import { PhoneAuthProvider, signOut } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { useContext } from 'react'
import  { AuthContext } from '../contextApi/contextapi'
import { ChatContext } from "../contextApi/chatContext";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";

import MessagePanel1 from "./mesagepanel";
import Input from "./input";
import Sidebar from "./sidebar";
import LastStatus from 'react-last-status/lib/components/LastStatus';
//import timestamp
import { Timestamp } from 'firebase/firestore';
import LastStatusProvider from "react-last-status";

import { Detector } from "react-online-status";
import { Offline } from 'react-online-status';
import { Online } from 'react-online-status';
import { collection } from "firebase/firestore";

import { where } from "firebase/firestore";
import { query } from "firebase/database";



const Messages=({setPhonvView})=>{



  
    const [messages,setMessages]=useState([]);
    const [user,setUser]=useState([]);
    const { data } = useContext(ChatContext);
    
    const [text,setText]=useState("");
   // const [user,setUser]=useState(null);
  
   // const {data}=useContext(ChatContext);
    const [activeChat,setActiveChat]=useState(false);
    const [phone,setPhone]=useState(false);
const setPhoneView1=()=>{
  setPhone(!phone)
}
const {currentUser}=useContext(AuthContext)


//console.log(auth.currentUser.uid);
/*useEffect(() => {
 // const getChat=()=>{

  
  const usersRef = collection(db, "users");
  // create query object
  const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
  // execute query
  const unsub = onSnapshot(q, (querySnapshot) => {
    let user = [];
    querySnapshot.forEach((doc) => {
      user.push(doc.data());
    });
    setUser(user);
  
  });
  
 // currentUser.uid&&getChat();
  
  return () => unsub();
  //}

}, [currentUser.uid])*/

  

    console.log(user);
  

    useEffect(() => {
      const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
       
      });
  
      return () => {
        unSub();
      };
    }, [data.chatId]);


    return(
      
      <section class={phone?'chat':'chat active'}  >
        <div class="header-chat">
        <i class={phone?'fa-solid fa-arrow-right':'fa-solid fa-arrow-right'} style={{position:'absolute',right:'0px',fontSize:'20px'}}onClick={setPhoneView1}></i>
          <i class="icon fa fa-user-o"></i>
    
     
         <div className='photo1'>
            {data.user.photoURL&&<img src={data.user.photoURL} class='image1' />}
            <div className="flex-col">
            <h2 class="name">{data.user.displayName}</h2>
   {
    
      <p className="status">{data.user.status}</p>
    
   }
           
   
            <div>
 </div>
    
   
</div>
              </div>
          
        
         
       
          </div>

        <div class="messages-chat">
          
         
            {messages.map((k)=>(
                <MessagePanel1 message={k} key={k.id}/>
            ))
}
        </div>
      

      <Input chat1={data.user.displayName}></Input> 

      
 {phone&&<Sidebar setPhoneView1={setPhoneView1}/>}
        </section>
         
       
    )

    
}
export default Messages;