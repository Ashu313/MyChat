

import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";import "./navbar.css"
import Login from "../../home/login";
import { useContext } from "react";
import { ChatContext } from "../../contextApi/chatContext";
import { AuthContext } from "../../contextApi/contextapi";


/*
   <div className="container">
<div className={click?"nav-menu1 active":"nav-menu1"}>
       <div className="login-area">
       <NavLink to="/Sign-in" ><i class="fa-solid fa-chevron-right"></i>Sign-in</NavLink>
       </div>
   
       <div className="register-area">
       <NavLink to="/Register" >
       <i class="fa-solid fa-chevron-right"></i> Register</NavLink>
       </div>
      
       </div>

         
   
       
   </div>*/

   /*<div className="container-fluid flex_space ">

<div className="logo">
  <img src="https://wildlifesos.org/wp-content/uploads/2020/11/wsos-Bear-Logo-border-85x130-1.png" alt="animalphoto"></img>
</div>

<div className="contact-details flex_space">
<div className="box flex_space">
  <div className="icons">
    <i className="fas fa-clock"></i>
  </div>
  <div className="text">
    <h3>working hours</h3>
    <NavLink to='/contact'>Monday to sunday :9.00am to 9:00pm</NavLink>
  </div>
</div>

<div className="box flex_space">
  <div className="icons">
    <i className="fas fa-phone-volume"></i>
  </div>
  <div className="text">
    <h3>Call Us</h3>
    <NavLink to='/contact'>+01001010101010</NavLink>
  </div>
  </div>
  <div className="box flex_space">
  <div className="icons">
    <i className="fas fa-envelope"></i>
  </div>
  <div className="text">
    <h3>Mail Us</h3>
    <NavLink to='/contact'>Kashutosh727@gmail.com</NavLink>
  </div>
</div>
</div>

</div>
 */


const Navbar=()=>{

    const { currentUser } = useContext(AuthContext);
    const [click,setClick]=useState(false);
    const [modalOpen,setModelOpen]=useState(false);
  const handleClick=()=>setClick(!click);
  const closeMobileMenu=()=>setClick(false);

    return (
              
      <>
   <header className={currentUser?'hello active':'hello'}>

   <div className="menu-icons"  onClick={handleClick}  >
  <i className={click?"fas fa-times":"fas fa-bars"}></i>
         
  </div>

      
     
       <div className="navbar" >
       <div className={click?"nav-menu active":"nav-menu"}>
       <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
     {!currentUser?
     <>
               <NavLink to="/login" onClick={closeMobileMenu}>Login</NavLink>
               <NavLink to="/register"  onClick={closeMobileMenu}>Signup</NavLink>
               </>
               :
               <NavLink to="/features"  onClick={closeMobileMenu}>Packages</NavLink>
     }
               <NavLink to="/Testimonials"  onClick={closeMobileMenu}>review</NavLink>
   
               <NavLink to="/contact"  onClick={closeMobileMenu}>Contact</NavLink>
       </div>
       </div>


    
         
   
        
       
    
   </header>


   <div className="container-fluid flex_space ">



<div className="contact-details flex_space">
<div className="box flex_space">
 
 
</div>

<div className="box flex_space">
 
 
  </div>
  <div className="box flex_space">
 
  
</div>
</div>

</div>

   
</>
       
    )
}

export default Navbar;