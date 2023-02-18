import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";

import 'bulma/css/bulma.min.css';
import 'material-icons/iconfont/material-icons.css';

import './App.css'
import MainTabs from './components/MainTabs/MainTabs.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';

function App(props) {
  const [ token, setToken ] = useState(localStorage.getItem('token'))

  if (!token) {
    return (
      <>
        <LoginPage setToken={setToken} />
      </>
    )
  }

  return(
   <>
    <div className="pages">
      <Outlet />
    </div>
    <MainTabs/>
   </>
  );
 }

export default App