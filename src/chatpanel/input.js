import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db, storage } from '../Firebase'
import { useContext } from 'react'
import  { AuthContext } from '../contextApi/contextapi'
import { useEffect } from 'react'
import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc, Timestamp, updateDoc } from 'firebase/firestore'
import "./input.css"
import { object } from 'prop-types'
import { ChatContext } from '../contextApi/chatContext'
import { uuidv4 } from '@firebase/util'
import "./message.css"
import Chats from './chats'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import EmojiPicker from 'emoji-picker-react'
import SpeechRecognition from 'react-speech-recognition'

import Dictaphone from '../home/microphone'
import useSpeechToText from 'react-hook-speech-to-text';
import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';


//rafe
import Dictaphone1 from '../home/microphone'
const Input = ({chat1}) => {

 
  const [text,setText]=useState("");
  
   
  const {data}=useContext(ChatContext);

  const {currentUser}=useContext(AuthContext);
  const [img,setFile]=useState();

  const [showPicker,setShowPicker]=useState(false);
  const [value, setValue] = useState('')
  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setText(result);
    },
  });

  console.log(data.user.displayName);
  let chat_user=data.user.displayName;
 

  const onEmojiClick=(event,emojiObject)=>{
    setText((prevInput)=>
  prevInput+emojiObject.emoji);

  }

 
  const handleSend=async()=>{


    if(img)
    {
      console.log("hello");
      try{
       const storageRef=ref(storage,uuidv4());
       console.log(storageRef);
       await uploadBytesResumable(storageRef,img);
          getDownloadURL(storageRef).then(async (DownloadURL)=>{
            try{
            await updateDoc(doc(db,'chats',data.chatId),{
              messages:arrayUnion({
                   id:uuidv4(),
                   text:text===""?'photo':text,
                   senderId:currentUser.uid,
                   date:Timestamp.now(),
                    img:DownloadURL,
                 }),
               });
               console.log(DownloadURL);
              }
    catch(error)
    {
      const errorCode = error.code;
      const errorMessage = error.message;
     
      console.log(errorMessage);

    }
          })
        }
       catch(error)
       {
        const errorCode = error.code;
        const errorMessage = error.message;
       
        console.log(errorMessage);
       }
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

        

        
  

        { 
          showPicker&&<EmojiPicker pickerStyle={{width:'100%'}} onEmojiClick={onEmojiClick}/>
        }
      
       
<p style={{color:'white',textAlign:'center',color:'chartreuse' ,marginTop:'-30px'}}>{text?`${data.user.displayName} is typing..`:''}</p>
          <div class="footer-chat">
        
          {chat1 &&<i class="fa-solid fa-face-smile"  onClick={() => setShowPicker((val) => !val)} style={{cursor:'pointer' ,position:'absolute',left:'10px',}}></i>}
        <div className='cc'>

        {chat1 &&<textarea type="text" class="write-message" placeholder="message here..." value={text}  onChange={(event)=>setText(event.target.value)}  cols={30} /> }
          
          </div>
         {chat1 && <input type="file"   id='input' style={{cursor:'pointer', marginRight:'6px' }} onChange={(e)=>setFile((e.target.files[0]))
           }/>}
 
        {chat1 &&text&& <i class="fa-solid fa-paper-plane" style={{cursor:'pointer',marginRight:'6px' }} onClick={handleSend}></i>}
          
        {chat1 &&<i class="fa-solid fa-volume-high" style={{cursor:'pointer' ,marginRight:'6px'}}onClick={() => speak({ text: text })}></i>}
       
         {chat1 && <i class="fa-solid fa-microphone" onMouseDown={listen} onMouseUp={stop} style={{cursor:'pointer',marginRight:'6px'}}></i>}
         {listening && <div>⏺️</div>}
        

         
          {chat1 &&<div className='label'>
            <label className='image-upload' htmlFor='input'>
            <i class="fa-solid fa-file" style={{marginRight:'6px'}}  ></i>
            </label>
          </div>}
          {img &&<i class="fa-solid fa-paper-plane" style={{cursor:'pointer',marginRight:'6px' }} onClick={handleSend}></i>}
          {chat1&&<img src={img}
            />}
          
  

        </div>
     
       
    
     
   </>
  )
  }
  
 
export default Input;
 


