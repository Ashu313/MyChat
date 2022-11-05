import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';
export const AuthContext=createContext();

const  ContextApi=({children})=>{
    const [currentUser,setCurrentUser]=useState({});
    
    useEffect(()=>{  ///this a real time messaging hence we need to refresh the useffect otherwise it will cause memory leak
     onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user);
        console.log(user);
     })
    },[]);
    return(
        <>
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    </>
    )
    
}

export default ContextApi