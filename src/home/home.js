import React from 'react'
import Chats from '../chatpanel/chats'
import MessagePanel1 from '../chatpanel/mesagepanel'
import Messages from '../chatpanel/messages'
import Sidebar from '../chatpanel/sidebar'
import "./home.css"

const Home = ({setPhoneView}) => {
  return (
    <div className='home'>
    <div className='container'>
    <Sidebar/>
     <Messages setPhonvView={setPhoneView}/>
    
      
    </div>
    </div>
  )
}

export default Home