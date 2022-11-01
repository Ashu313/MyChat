import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContextApi from './contextApi/contextapi';
import { ChatContextProvider } from './contextApi/chatContext';
import Dictaphone1 from './home/microphone';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
<ContextApi>
   <ChatContextProvider>
      <App>
    
    
    
      </App>
   </ChatContextProvider>

</ContextApi>

    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
