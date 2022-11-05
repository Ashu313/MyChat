import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { auth } from "../Firebase";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { db } from "../Firebase";
import { useState } from "react";
import { useEffect } from "react";

import { AuthContext } from "./contextapi";
import LastStatusProvider from "react-last-status";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {

 
  const { currentUser } = useContext(AuthContext);
  
  
    
    
     //}
   
  
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
             
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};