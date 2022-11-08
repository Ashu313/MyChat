import React from 'react'
import { useState } from 'react';
import { query, where, getDocs, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import {  db } from '../Firebase';
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
import { onValue } from 'firebase/database';
import { push } from 'firebase/database';
import { set } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';



import { database } from '../Firebase';
import { update } from 'firebase/database';
import { getDatabase, ref, onDisconnect } from "firebase/database";
import { useRef } from 'react';



const Sidebar = ({ setPhoneView1 }) => {

  const { dispatch } = useContext(ChatContext);
  //const[phone,setPhone]=useState(false);

  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser.uid);
  const[user1,setUser1]=useState(null)
  const [chat, setChat] = useState([]);
  const [online,setOnline]=useState(false);
  const { data } = useContext(ChatContext);
  console.log(data.user.uid);
  let k1=currentUser.uid+data.user.uid;
  console.log(k1);
  const handle = (u) => {

    dispatch({ type: 'CHANGE_USER', payload: u })
  }



  const [phone, setPhone] = useState(false);
  //const [chat,setChat]=useState([]);
  const setPhoneView = () => {
    setPhone(!phone)
  }

console.log(data.user.uid);
 { const docRef = doc(db, "users", `${currentUser.uid}`);
      console.log(docRef);
        const data = {
          
          status:'online',
        };
        updateDoc(docRef, data)
       
      }

    
  
     



 
 
  var k2=false;
  const Sign = async() => {
    
    
  //console.log(`${(Object.entries(Object.entries(currentUser.uid))[0][1])[1].userinfo}`);
    
   
  

  
    try{
 
      const docRef = doc(db, "users", `${currentUser.uid}`);
      console.log(docRef);
        const data = {
          
          status:new Date().toDateString()+' '+new Date().toLocaleTimeString(),
        };
        updateDoc(docRef, data)
      
 }
    
catch(error) {
    console.log(error);
}



    signOut(auth);
  }


console.log(k2);
  //console.log(Object.entries(chat));


  const handleSearch = async () => {
    console.log("dhhd");


    try {
       
      const q = query(collection(db, "users"), where("email", "==", username));
      console.log("bs");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        setUser(doc.data());

        console.log(doc.uid, doc.data());
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]));
        // execute query
        const unsub = onSnapshot(q, (querySnapshot) => {
          let user1 = [];
          querySnapshot.forEach((doc) => {
            user1.push(doc.data());
          });
          setUser1(user1);
        
        });
        console.log(user1)

        return()=>{
          unsub();
        }

    

      });
    }
    catch (err) {
      console.log(err);
    }
  }
 

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  }

  const handleSelectUser =   async() => {
    
    

    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const res = await getDoc(doc(db, 'chats', combineId));
    console.log(res);
    console.log(currentUser.uid);
    console.log(user.uid);
    console.log(res.exists() ? 'true' : 'false');
    try {


      if (!res.exists()) {
     
        

     
        console.log(res);
        await setDoc(doc(db, 'chats', String(combineId)), { messages: [] });
        console.log("h");
        await updateDoc(doc(db, 'usersChats', String(currentUser.uid)),
         {
         
          [combineId + ".userinfo"]: {
            uid: user.uid,
           
            displayName: user.displayName,
            photoURL: user.photoURL,
            email:user.email,
            status:user.status,
         
         
            





          },
          [combineId + ".date"]: serverTimestamp(),

        });
        console.log("user update hua");
        await updateDoc(doc(db, 'usersChats', String(user.uid)),
         {
        
          [combineId + ".userinfo"]: {
            uid: currentUser.uid,
           
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
               email:currentUser.email,
               status:user.status,
              
               
             
          


          },
          [combineId + ".date"]: serverTimestamp()
          
        });

        console.log("dhdhd");

      }
      else{
        await updateDoc(doc(db, 'usersChats', String(currentUser.uid)),
        {
        
         [combineId + ".userinfo"]: {
           uid: user.uid,
          
           displayName: user.displayName,
           photoURL: user.photoURL,
           email:user.email,
           status:"online",
        
        
           





         },
         [combineId + ".date"]: serverTimestamp(),

       });
       console.log("user update hua");
       await updateDoc(doc(db, 'usersChats', String(user.uid)),
        {
       
         [combineId + ".userinfo"]: {
           uid: currentUser.uid,
          
           displayName: currentUser.displayName,
           photoURL: currentUser.photoURL,
              email:currentUser.email,
              status:"online",
             
              
            
         


         },
         [combineId + ".date"]: serverTimestamp()
         
       });

      }
    }
    catch (err) {
      
      console.log(err);
      console.log("jjnjnjj");
    
  }
  






    console.log("dhdhhd");

    // setText(" ");


    


    setUserName("");
    setUser(null);

    console.log("chdhhf");
   

    //console.log(chat[1].userinfo.displayName)

  }
  var k = 1;
  const handleSelet = async(u) => {
   
    dispatch({ type: 'CHANGE_USER', payload: u })
    
  }
  return (



    
    <section class={phone ? 'discussions1 active' : 'discussions1'}   >
    


      <div class="flex">
        <div className='image-bottom'>
          <h1>{currentUser.displayName}</h1>
        {/*  <h1>{currentUser.metadata.lastSignInTime}</h1>*/}
          <img src={currentUser.photoURL} />
        </div>
        <div className='butt'>
          <button type="button" onClick={Sign} >SignOut</button>
        </div>
       
      </div>


      <div class="discussion search">
        <div class="searchbar" onClick={handleSearch}>
          <i class="fa-solid fa-magnifying-glass" style={{cursor:'pointer',color:'black',marginLeft:'-15px',fontSize:'18px'}} ></i>
          <input type="text" placeholder="Search by email...." value={username} onKeyDown={handleKey} onChange={(e) => setUserName(e.target.value)}></input>
        </div>
      </div>
      {user &&
        <div class="discussion message-active" onClick={handleSelectUser}>
          <div class="desc-contact" style={{ display: 'flex', gap: '1rem' }} onClick={() => {
            handleSelet(user.displayName)
            setPhoneView1(false)
          }}>

            <div class="photo" style={{ backgroundImage: `url(${user.photoURL})` }} onClick={setPhoneView}
          //  handleSelet(user.displayName)
           //setPhoneView1(true)
          >

              <div class="online">

              </div>
            </div>
            <div class="desc-contact" >
              <p class="name" >{user.displayName}</p>
      
            </div>
      
          </div>
      
      
  
  


        </div>
}



  {  console.log('hua')}
      
      {chat&&<Chats setPhoneView1={setPhoneView1} />}
    
{console.log('phirhua')}


    </section>




  )
}

export default Sidebar;