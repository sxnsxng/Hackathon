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

import SelectRole from './modules/Gameplay/page/SelectRole.tsx';
import Gameplay from './modules/Gameplay/page/GamePlay.tsx';
import Result from './modules/Gameplay/page/Result.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/SelectRole",
    element: <SelectRole />,
  },
  {
    path: "/Gameplay",
    element: <Gameplay />,
  },
  {
    path: "/Result",
    element: <Result />,
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)