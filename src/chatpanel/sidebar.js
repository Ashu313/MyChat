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

const Sidebar = ({ setPhoneView1 }) => {

  const { dispatch } = useContext(ChatContext);
  //const[phone,setPhone]=useState(false);

  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState([]);
  const { data } = useContext(ChatContext);
  const handle = (u) => {

    dispatch({ type: 'CHANGE_USER', payload: u })
  }
  var date = new Date();
// get the date as a string
var n = date.toDateString();
// get the time as a string
var time = date.toLocaleTimeString();
 var st =n+' '+time;
 console.log(st);
// log the date in the browser console
console.log('date:', n);
// log the time in the browser console
console.log('time:',time);
  // const [phone,setPhone]=useState(false);



  const [phone, setPhone] = useState(false);
  const setPhoneView = () => {
    setPhone(!phone)
  }





  //const {currentUser}=useContext(AuthContext);
  //const [chat,setChat]=useState([]);

  //const{dispatch}=useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
      console.log("jnd");
      const refresh = onSnapshot(doc(db, 'usersChats', currentUser.uid), (doc) => {
        //console.log('current-data',doc.data());
        setChat(doc.data());
      });

      return () => {
        refresh();
      }
    };
    currentUser.uid && getChats();

  }, [currentUser.uid]);



  const Sign = () => {
    const docRef = doc(db, "users", `${currentUser.uid}`);
  console.log(docRef);
    const data = {
      
      status:st,
    };
    updateDoc(docRef, data)
  .then((docRef) => {
    console.log("A New Document Field has been added to an existing document");
 })
 .catch(error => {
    console.log(error);
})
    signOut(auth);
  }
 

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


      });
    }
    catch (err) {
      console.log(err);
    }
  }
 

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  }

  const handleSelectUser = async () => {
    const combineId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    const res = await getDoc(doc(db, 'chats', combineId));
    console.log(res);
    console.log(currentUser.uid);
    console.log(user.uid);
    console.log(res.exists() ? 'true' : 'false');
    try {


      if (res.exists()) {
     
        

     
        console.log(res);
        await setDoc(doc(db, 'chats', combineId), { messages: [] });
        console.log("h");
        await updateDoc(doc(db, 'usersChats', currentUser.uid), {
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
        await updateDoc(doc(db, 'usersChats', user.uid), {
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
    } catch (err) {
      console.log(err);
      console.log("jjnjnjj");
    }







    console.log("dhdhhd");

    // setText(" ");


    console.log(user.displayName);
   


    setUserName("");
    setUser(null);

    console.log("chdhhf");

    //console.log(chat[1].userinfo.displayName)

  }
  var k = 1;
  const handleSelet = (u) => {

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
        <div class="searchbar" >
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search by name...." value={username} onKeyDown={handleKey} onChange={(e) => setUserName(e.target.value)}></input>
        </div>
      </div>
      {user &&
        <div class="discussion message-active" onClick={handleSelectUser}>
          <div class="desc-contact" style={{ display: 'flex', gap: '1rem' }} onClick={() => {
            handleSelet(user.displayName)
          //  setPhoneView1(true)
          }}>

            <div class="photo" style={{ backgroundImage: `url(${user.photoURL})` }}>

              <div class="online">

              </div>
            </div>
            <div class="desc-contact" >
              <p class="name" >{user.displayName}</p>
      
            </div>
      
          </div>
      
      
  
  


        </div>
}




      
      {chat && <Chats setPhoneView1={setPhoneView1} />}




    </section>




  )
}

export default Sidebar;