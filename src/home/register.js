import React from 'react'
import "./register.css"
import { auth, storage } from '../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import {ref,uploadBytesResumable} from 'firebase/storage'
import { getDownloadURL } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { doc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';




const  Register=() => {

 
    const [err,setErr]=useState(false);
   // const[user,setUser]
    const [loader,setLoader]=useState(false);
    const navigate=useNavigate();

    const HandleSubmit=async(e)=>{
       e.preventDefault();
        const DisplayName=e.target[0].value;
        console.log(DisplayName);
        const Email=e.target[1].value;
        console.log(Email);
        const Password=e.target[2].value;
        console.log(Password);
        const CnfPassword=e.target[3].value;
        console.log(CnfPassword);
        const file=e.target[4].files[0];
      
        if(Password===CnfPassword)
        {
            setLoader(!loader);
        


      //  setLoader(loader);
      
        try{
          const res=await createUserWithEmailAndPassword(auth,Email,Password);
        const date=new Date().getTime();
          const storageRef=ref(storage,`${DisplayName+date}`);
           await uploadBytesResumable(storageRef, file).then(()=>{
            getDownloadURL(storageRef).then(async(DownloadURL)=>{
         
            await setDoc(doc(db, 'users', res.user.uid), {
              uid:( res).user.uid,
                 displayName:DisplayName, 
               email:Email,
               photoURL:DownloadURL,
               status:'online',
               isOnline:true,
            
               
               });
            await updateProfile(res.user,{
              displayName:DisplayName,
           
              photoURL:DownloadURL,
            });
           

          
               await setDoc(doc(db, 'usersChats',( res).user.uid), {})
               navigate('/');

          })
        })
            
          }
          
     
        
           
           
            // ...
          
        
        catch(error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErr(true);
          console.log(errorMessage);
          
        }
       

        }
        else{
            window.alert('wrong password');
        }
    }
     
   
  return (
    !loader?
    <>
    <div class=" flex-r container">
    <div class="flex-r login-wrapper">
      <div class="login-text">
        <div class="logo">
          <span><i class="fab fa-speakap"></i></span>
          <span>Messenger Chat</span>
        </div>
        <h1 style={{color:'black'}}>Sign Up</h1>
        <p>It's not long before you embark on this journey! </p>

        <form class="flex-c" onSubmit={HandleSubmit}>
        <div class="input-box">
            <span class="label">Name</span>
            <div class=" flex-r input">
              <input type="text" placeholder=""/>
              <i class="fas fa-at"></i>
            </div>
          </div>
          <div class="input-box">
            <span class="label">E-mail</span>
            <div class=" flex-r input">
              <input type="text" placeholder="name@abc.com"/>
              <i class="fas fa-at"></i>
            </div>
          </div>
          <div class="input-box">
            <span class="label">Password</span>
            <div class=" flex-r input">
              <input type="text" placeholder=""/>
              <i class="fas fa-at"></i>
            </div>
          </div>
          <div class="input-box">
            <span class="label">CnfPassword</span>
            <div class="flex-r input">
              <input type="password" placeholder="8+ (a, A, 1, #)"/>
              <i class="fas fa-lock"></i>
            </div>
          </div>
          <div class="input-box">
            <span class="label">upload files</span>
            <div class="flex-r input">
              <input type="file"/>
              <i class="fas fa-lock"></i>
            </div>
          </div>
       
     

          <div class="check">
            <input type="checkbox" name="" id=""/>
            <span>I've read and agree with T&C</span>
          </div>

          <input class="btn" type="submit" value="Create an Account" />
          <span class="extra-line">
            <span>Already have an account?</span>
            <a href="#">Sign In</a>
          </span>
          {
            err && <span>something went wrong</span>
          }
        </form>

      </div>
    </div>
  </div>
  </>
  :<img src="https://i.gifer.com/origin/4d/4dc11d17f5292fd463a60aa2bbb41f6a_w200.webp" alt="loading..."  style={{width:"50%",height:"100%",position:'relative',top:'100px'}}/>
  )
}


export default Register;

