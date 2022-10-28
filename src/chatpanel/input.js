import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db, storage } from '../Firebase'
import { useContext } from 'react'
import  { AuthContext } from '../contextApi/contextapi'
import { useEffect } from 'react'
import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore'

import { object } from 'prop-types'
import { ChatContext } from '../contextApi/chatContext'
import { uuidv4 } from '@firebase/util'
import "./message.css"
import Chats from './chats'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

//rafe
const Input = ({chat1}) => {

 
  const [text,setText]=useState("");
  
  const {data}=useContext(ChatContext);

  const {currentUser}=useContext(AuthContext);
  const [img,setFile]=useState(null);

  console.log(data.user.displayName);
  let chat_user=data.user.displayName;
  const handleSend=async()=>{


    if(img)
    {
      console.log("hello");
       const storageRef=ref(storage,uuidv4());
       console.log(storageRef);
       const uploadTask=uploadBytesResumable(storageRef,img);
       console.log(uploadTask);
       uploadTask.on(
        (error)=>{
          console.log("Sec");
          console.log(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async (DownloadURL)=>{
            await updateDoc(doc(db,'chats',data.chatId),{
              messages:arrayUnion({
                   id:uuidv4(),
                   text:text===DownloadURL?"photo":text,
                   senderId:currentUser.uid,
                   date:Timestamp.now(),
                    img:DownloadURL,
                 }),
               });
               console.log(DownloadURL);
          })
        }
       )
    }
    else
    {
   await updateDoc(doc(db,'chats',data.chatId),{
   messages:arrayUnion({
        id:uuidv4(),
        text:text,
        senderId:currentUser.uid,
        date:Timestamp.now()
      })
    });
  }
    await updateDoc(doc(db,'usersChats',currentUser.uid),{
    [data.chatId+'.lastmessage']:{
      text,
    },

    [data.chatId+'.date']:{
      date:Timestamp.now().seconds
    },

    });

    await updateDoc(doc(db,'usersChats',data.user.uid),{
      [data.chatId+'.lastmessage']:{
        text
      },
      [data.chatId+'.date']:{
        date:Timestamp.now().seconds
      },
  
      });
      console.log("dhdhhd");
   
    
      setText("");
 setFile(null);
  
    }
  
//currentUser




    

 return (
   <>

    
      
 
  
      
       
<p style={{color:'white',textAlign:'center',color:'chartreuse' ,marginTop:'-30px'}}>{text?`${data.user.displayName} is typing..`:''}</p>
          <div class="footer-chat">
          
        <div className='cc'>
          {chat1&&<textarea type="text" class="write-message" placeholder="Type your message here" value={text} onChange={(e)=>setText(e.target.value)}  cols={30}/> }
          
          </div>
         {chat1 && <input type="file"  id='input'  onChange={(e)=>setFile((e.target.files[0]))
           }/>}

        {chat1 &&  <i class="fa-solid fa-paper-plane"  onClick={handleSend}></i>}
          
         {chat1 && <i class="fa-solid fa-microphone"></i>}
          {chat1 &&<i class="fa-solid fa-face-smile"></i>}
          
          {chat1 &&<div className='label'>
            <label className='image-upload' htmlFor='input'>
            <i class="fa-solid fa-file"></i>
            </label>
          </div>}
          <img src={(img)} />
          
       

        </div>
     
       
    
     
   </>
  )
  }
  
 
export default Input;
 


