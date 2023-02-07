import React from 'react';
import { Outlet } from "react-router-dom";

import MainTabs from './components/MainTabs.jsx';

class App extends React.Component {
 render() {
  return(
   <>
    <Outlet />
    <MainTabs/>
   </>
  );
 }
}
export default App