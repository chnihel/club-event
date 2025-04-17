import React from 'react';

import './App.css';

import Home from './views/home/home';
import router from './Routes/router';
import { RouterProvider } from 'react-router-dom';


function App() {
  return (
    <div className="App">
    <RouterProvider router={router} />
  </div>
  )
  


}

export default App;
