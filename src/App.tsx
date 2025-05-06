import React, { useEffect } from 'react';

import './App.css';

import Home from './views/home/home';
import router from './Routes/router';
import { RouterProvider } from 'react-router-dom';
import { onMessageListener, requestFCMToken } from './firebase';
import NotificationProvider from './component/NotificationProvider';


function App() {
  useEffect(() => {
    requestFCMToken();

    // Optionnel : pour afficher les notifications dans l'UI
    onMessageListener().then(payload => {
      console.log("Notification reçue en premier plan : ", payload);
      alert("Notification reçue en premier plan : ")
      // afficher dans une toast par exemple
    });
  }, []);
  return (
  /*   <NotificationProvider> */
    <div className="App">
    <RouterProvider router={router} />
    
  </div>

  )
  


}

export default App;
