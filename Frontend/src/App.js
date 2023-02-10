import React from 'react';
import { Outlet } from "react-router-dom";

import 'bulma/css/bulma.min.css';

import './App.css'
import MainTabs from './components/MainTabs/MainTabs.jsx';


function App(props) {
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