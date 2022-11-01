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





function App() {

 
const {currentUser}=useContext(AuthContext)

const HideHome=({children})=>{
  if(!currentUser)
  {
    return <Navigate to="/login"/>
  }
  return children;
}

  return (
  <>
  <Dictaphone1></Dictaphone1>
  <BrowserRouter>
  <Routes>
   
   <Route path='/'element=
    {<HideHome><Home></Home></HideHome>}/>
  
   <Route path='/login'element={<Login/>}/>
   <Route path='/register'element={<Register/>}/>
  </Routes>
  </BrowserRouter>
 




 </>
    
  
   
  
    

  
  );
}

export default App;
