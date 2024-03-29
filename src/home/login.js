import React from 'react'
import { signInWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import { app, auth, database } from '../Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import "./login.css";
import { useState } from 'react';
import { ChatContext } from '../contextApi/chatContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contextApi/contextapi';
import { query, where, getDocs, getDoc, updateDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import {  db } from '../Firebase';
import { doc } from 'firebase/firestore';
import { set } from 'firebase/database';
import { onDisconnect } from 'firebase/database';
import { update } from 'firebase/database';
 import { ref } from 'firebase/database';

const Login=()=>{
 

 const [loading, setLoading] = useState("hello world");
 const[sign,setSign]=useState(false);
 const { currentUser } = useContext(AuthContext);



 

  const [Err,setErr]=useState(false);
  const navigate=useNavigate();
  const HandleSignIn=async(e)=>{
    e.preventDefault();
 
     const Email=e.target[0].value;
     console.log(Email);
     const Password=e.target[1].value;
     console.log(Password);
   
    // const auth = getAuth();
   // Set up a reference to the user's node


   
    try{
     
      setSign(!sign);
      const res=await signInWithEmailAndPassword(auth, Email, Password)
      
      setLoading(!loading)

      await updateDoc(doc(db,'users',res.user.uid),{
        status:'online'
   })
       setSign(sign);
  
     
    //  setLoading(!loading)

      navigate('/')
     

  
  set(ref(database, `users_presence/${res.user.uid}`), {
   status:"online",
  });
  const lastSeen =new Date().toDateString()+' '+new Date().toLocaleTimeString()
update(ref(database, `users_presence/${res.user.uid}`), { lastSeen });

// Update the user's last seen timestamp every 5 seconds
setInterval(() => {
  update(ref(database, `users_presence/${res.user.uid}`), { lastSeen:new Date().toDateString()+' '+new Date().toLocaleTimeString()});
}, 5000);

// Set the user's last seen timestamp to null when they disconnect from the database
onDisconnect(ref(database, `users_presence/${res.user.uid}`)).update({ lastSeen:new Date().toDateString()+' '+new Date().toLocaleTimeString() });

  // Set up a reference to the user's node
 // Set up a reference to the user's node


  
           
       /*res.then((userCredential) => {
         // Signed in 
          const user = userCredential.user;
         console.log("hfhfhd");
         console.log(user);
         
               navigate('/')
         
       
         // ...
       })*/
      
       console.log("shhs");
      }catch(error) {
         const errorCode = error.code;
         const errorMessage = error.message;
         setErr(true);
         setSign(true);
         console.log(errorMessage);
         setLoading(false);
       }
      
   
   
  };
  return (
    !sign  ?
    <>
    <div class="login">
  <div class="form">
   
    <form class="login-form" onSubmit={HandleSignIn}>
    
      <span class="material-icons">lock</span>
      <input type="text" placeholder="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
      <input type="password" placeholder="password" required />
      <button>login</button>
      <span class="extra-line">
    
      {
        
        Err && sign && <span>Invalid Creditials</span>
        }
          <br></br>
            <span>Dont have an account?</span>
            <NavLink to='/register'>Sign Up</NavLink>
          </span>
        
    </form>  

  </div>
</div>
</>
:Err?  <div class="login">
<div class="form">
 
  <form class="login-form" onSubmit={HandleSignIn}>
  
    <span class="material-icons">lock</span>
    <input type="text" placeholder="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
    <input type="password" placeholder="password" required />
    <button>login</button>
    <span class="extra-line">
  
    {
      
      Err && <span>Invalid Creditials</span>
    
    
      }
        <br></br>
          <span>Dont have an account?</span>
          <NavLink to='/register'>Sign Up</NavLink>
        </span>
      
  </form>  

</div>
</div>:<img src="https://i.gifer.com/origin/4d/4dc11d17f5292fd463a60aa2bbb41f6a_w200.webp" alt="loading..."  style={{position:'relative',top:'100px' ,left:'50%'}}/>

  
  )

}

export default Login;