import React from 'react';
import { Outlet } from "react-router-dom";

import MainTabs from './components/MainTabs.jsx';
import Card from './components/Card.jsx';
import 'bulma/css/bulma.min.css';

import './App.css'

function App() {
  return(
   <>
    <div className="pages">
        <Card>
            <Outlet />
        </Card>
    </div>
    <MainTabs/>
   </>
  );
 }

export default App