import React from 'react'
import { createRoot } from 'react-dom/client';
import {
    RouterProvider
} from "react-router-dom";

import router from './routes.js'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<RouterProvider router={router} />);