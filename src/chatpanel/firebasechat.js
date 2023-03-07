/*import React, { useState, useEffect } from 'react';

import app, { auth } from "../Firebase";
import { database } from '../Firebase';
import { ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { set } from 'firebase/database';
const App1 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
   

  useEffect(() => {
    const auth=getAuth();
    onAuthStateChanged(auth,currentuser => {
      if (currentuser) {
        // User is logged in, update their status
        const userStatusDatabaseRef = ref(database,'/status/' + currentuser.uid);
        set(userStatusDatabaseRef, 'online');
        setIsLoggedIn(true);
        setUserId(currentuser.uid);
      } else {
        // User is logged out, update their status
        if (userId) {
          const userStatusDatabaseRef = app.database().ref('/status/' + userId);
          userStatusDatabaseRef.set('offline');
        }
        setIsLoggedIn(false);
        setUserId(null);
      }
    });

    return () => {
      if (userId) {
        const userStatusDatabaseRef = app.database().ref('/status/' + userId);
        userStatusDatabaseRef.set('offline');
      }
    };
  }, [userId]);

  return (
    <div>
      {isLoggedIn ? (
        <p>You are logged in.</p>
      ) : (
        <p>You are logged out.</p>
      )}
    </div>
  );
};

export default App1;
*/