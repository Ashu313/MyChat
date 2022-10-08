import React from 'react'
import { useState } from 'react';
import {  query, where, getDocs, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from '../Firebase';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../contextApi/contextapi';
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import Chats from './chats';
import { ChatContext } from '../contextApi/chatContext';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import Messages from './messages';
import Home from '../home/home';
import { collection } from 'firebase/firestore';


const Sidebar = ({setPhoneView1}) => {

  const {dispatch}=useContext(ChatContext);
  //const[phone,setPhone]=useState(false);
  
  const [user,setUser]=useState(null);
  const [username,setUserName]=useState('');
  const {currentUser}=useContext(AuthContext);
  const [chat,setChat]=useState([]);
  const{data}=useContext(ChatContext);
  const handle=(u)=>{
    
    dispatch({type:'CHANGE_USER',payload:u})
      }

 // const [phone,setPhone]=useState(false);



const[phone,setPhone]=useState(false);
  const setPhoneView=()=>{
    setPhone(!phone)
  }



            
              
  //const {currentUser}=useContext(AuthContext);
  //const [chat,setChat]=useState([]);
 
  //const{dispatch}=useContext(ChatContext)
 

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

 
      
  const Sign=()=>{
    signOut(auth);
  }
  useEffect(()=>{
    const getChats=()=>{
      console.log("jnd");
      const refresh=onSnapshot(doc(db,'usersChats',currentUser.uid),(doc)=>{
        console.log('current-data',doc.data());
        setChat(doc.data());
      });
  
      return()=>{
        refresh();
      }
    };
    currentUser.uid && getChats();
    
  },[currentUser.uid]);

//console.log(Object.entries(chat));


  const handleSearch= async()=>{
    console.log("dhhd");
    try{
    const q = query(collection(db, "users"), where("displayName", "==", username));
    console.log("bs");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     
      setUser(doc.data());
    
      console.log(doc.uid , doc.data());

      
    });
  }
catch(err){
  console.log(err);
}
  }


const handleKey=(e)=>{
  e.code==='Enter' && handleSearch();
  }

  const handleSelectUser=async(u)=>{
    const combineId=currentUser.uid>user.uid?currentUser.uid+user.uid: user.uid+currentUser.uid;
    const res=await getDoc(doc(db,'chats',combineId));
    console.log(res);
    console.log(currentUser.uid);
    console.log(user.uid);
    console.log(res.exists()?'true':'false');
    try{
    if(!res.exists())
    {
      console.log(res);
   await setDoc(doc(db,'chats',combineId),{messages:[]});
   console.log("h");
   await updateDoc(doc(db,'usersChats',currentUser.uid),{
  [combineId+".userinfo"]:{
    uid:user.uid,
    displayName:user.displayName,
    photoURL:user.photoURL,
   
   
   
    
  },
  [combineId+".date"]:serverTimestamp(),

   });
   await updateDoc(doc(db,'usersChats',user.uid),{
    [combineId+".userinfo"]:{
      uid:currentUser.uid,
      displayName:currentUser.displayName,
      photoURL:currentUser.photoURL,
     
    
      
    },
    [combineId+".date"]:serverTimestamp()
  });  
 
  console.log("dhdhd");

}
  }catch(err)
  {
    console.log(err);
    console.log("jjnjnjj");
  }
 

  




      console.log("dhdhhd");
    
     // setText(" ");
  

console.log(user.photoURL);
  

  setUserName(" ");
  setUser(null);
  
  console.log("chdhhf");
 
  //console.log(chat[1].userinfo.displayName)

} 
  return (

    
    
    
    <section class={phone?'discussions1 active':'discussions1'}   >
    
          
   
   <div class="flex">
    <div className='image-bottom'>
    <h1>{currentUser.displayName}</h1>
    <img src={currentUser.photoURL}/>
    </div>
    <div className='butt'>
    <button type="button" onClick={Sign} >SignOut</button>
    </div>
    </div>


    <div class="discussion search">
      <div class="searchbar" >
      <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search..."   value={username} onKeyDown={handleKey} onChange={(e)=>setUserName(e.target.value)}></input>
      </div>
    </div>
    {user&&
    <div class="discussion message-active"     onClick={handleSelectUser}>
     
 
  
    
     
     <div class="photo" style={{backgroundImage:`url(${user.photoURL})`}}>   
     
      <div class="online">
   
      </div>
   </div>
   <div class="desc-contact" >
     <p class="name">{user.displayName}</p>
     <p class="message"></p>
   </div>
   <div class="timer">{user.date}</div>
 
  
    
   
    </div>
   
  
}
{chat &&<Chats setPhoneView1={setPhoneView1}/>}  



 {/*{phone&&<Chats  phone={setPhoneView}/>}*/}
     
    {/*<div class="discussion">
    <div class="photo" style={{backgroundImage: "url(https://images.unsplash.com/photo-1435348773030-a1d74f568bc2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80);"}}>        <div class="online"></div>
      </div>
      <div class="desc-contact">
        <p class="name">Dave Corlew</p>
        <p class="message">Let's meet for a coffee or something today ?</p>
      </div>
      <div class="timer">3 min</div>
    </div>

    <div class="discussion">
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



    
  )

}

export default Sidebar;