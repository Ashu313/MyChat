import React from 'react'
import Chats from '../chatpanel/chats'
import App1 from '../chatpanel/firebasechat'
import MessagePanel1 from '../chatpanel/mesagepanel'
import Messages from '../chatpanel/messages'
import Sidebar from '../chatpanel/sidebar'
import "./home.css"

const Home = ({setPhoneView1}) => {
  return (
    <div className='home'>
    <div className='container'>
    <Sidebar/>
     <Messages setPhonvView1={setPhoneView1}/>
     
    
      
    </div>
    </div>
  )
}

export default Home