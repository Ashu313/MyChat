import React from 'react';
import Home from './home/home';
import Register from './home/register';
import { BrowserRouter, Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Login from './home/login';
import { useContext } from 'react';
import { AuthContext } from './contextApi/contextapi';
import Dictaphone1 from './home/microphone';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import Navbar from './Common/navbar/navbar';
import Homepage from './home/homepage';
import Features from './component/feature/features';
import { useEffect } from "react";
import { useLocation } from "react-router";

import "./App.css"


function App() {

 
const {currentUser}=useContext(AuthContext)

const HideHome=({children})=>{
  if(!currentUser)
  {
    return <Navigate to="/homepage"/>
  }
  return children;
}




const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{props.children}</>
};



  return (
  <>
 
  <BrowserRouter>
  <ScrollToTop/>
  <Navbar></Navbar>
  <Routes>
   
   {/*<Route path='/'element=
    {<HideHome><Home></Home></HideHome>}/>*/}
  <Route path='/'element=
    {<HideHome><Home></Home></HideHome>}/>
   <Route path='/login'element={<Login/>}/>
   <Route path='/register'element={<Register/>}/>
   <Route path='/homepage' element={<Homepage/>}/>
   <Route path='/features' element={<Features/>}/>
  </Routes>
  </BrowserRouter>
 




 </>
    
  
   
  
    

  
  );
}

export default App;
