import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import FixPage from "./pages/FixPage.jsx"
import CardsPage from './pages/CardsPage.jsx';
import IncomePage from './pages/IncomePage.jsx';
import StatusPage from './pages/StatusPage.jsx';

const router = createBrowserRouter([
{
    path: "/",
    element: <App />,
    children: [
      {
        path: "fix",
        element: <FixPage />,
      },
      {
        path: "cards",
        element: <CardsPage />,
      },
      {
        path: "income",
        element: <IncomePage />,
      },
      {
        path: "status",
        element: <StatusPage />,
      },
],
},
]);

export default router;