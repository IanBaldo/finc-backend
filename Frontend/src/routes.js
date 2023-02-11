import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import FixedExpensesPage from "./pages/FixedExpensesPage/FixedExpensesPage.jsx"
import CardsPage from './pages/CardsPage/CardsPage.jsx';
import IncomePage from './pages/IncomePage/IncomePage.jsx';
import StatusPage from './pages/StatusPage/StatusPage.jsx';
import CardDetailPage from './pages/CardDetailPage/CardDetailPage.jsx';

const router = createBrowserRouter([
{
  path: "/",
  element: <App />,
  children: [
    {
      path: "fix",
      element: <FixedExpensesPage />,
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
    {
      path: "cards/details",
      element: <CardDetailPage />
    }
  ],
},
]);

export default router;