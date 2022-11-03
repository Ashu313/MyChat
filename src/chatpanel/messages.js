

import { useEffect } from "react";
import React, { useState } from 'react'


import { signOut } from 'firebase/auth'
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


const Messages=({setPhonvView})=>{



  
    const [messages,setMessages]=useState([]);
    const { data } = useContext(ChatContext);
    const [text,setText]=useState("");
  
   // const {data}=useContext(ChatContext);
    const [activeChat,setActiveChat]=useState(false);
    const [phone,setPhone]=useState(false);
const setPhoneView1=()=>{
  setPhone(!phone)
}
    
    const {currentUser}=useContext(AuthContext)
   
    const set=()=>{
      setActiveChat(!activeChat);
    }

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
        <i class={phone?'fa-solid fa-arrow-left':'fa-solid fa-arrow-left'} onClick={setPhoneView1}></i>
        <div class="header-chat">
          <i class="icon fa fa-user-o"></i>
    
        
         <div className='photo1'>
            {data.user.photoURL&&<img src={data.user.photoURL} class='image1' />}
            <div className="flex-col">
            <h2 class="name">{data.user.displayName}</h2>
            <div style={{color:'green'}}>
                  
    <Offline >{new Date().toDateString()+' '+new Date().toLocaleTimeString()}</Offline>
  </div>
            <p className="status">{data.user.status}</p>
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