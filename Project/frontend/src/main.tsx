import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

//Login System
import Login from "./modules/login.tsx";
import Register from "./modules/register.tsx";

import Main from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: "/Register",
    element: <Register />
  },
  {
    path: "/Main",
    element: <Main />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)