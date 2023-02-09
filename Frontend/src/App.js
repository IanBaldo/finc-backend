import React from 'react';
import { Outlet } from "react-router-dom";

import MainTabs from './components/MainTabs.jsx';
import 'bulma/css/bulma.min.css';

function App() {
  return(
   <>
    <Outlet />
    <MainTabs/>
   </>
  );
 }

export default App