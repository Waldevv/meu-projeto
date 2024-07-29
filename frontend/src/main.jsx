// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './componentes/navBar/NavBar.jsx';
import Login from './componentes/login/Login.jsx';
import Register from './componentes/register/Register.jsx';
import Projetos from './pages/projetos/Projetos.jsx';
import Usuarios from './pages/usuarios/Usuarios.jsx';
import { AuthProvider } from './context/AuthProvider';

const router = createBrowserRouter(
  [
    {
      element: <NavBar />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/projetos",
          element: <Projetos />,
        },
        {
          path: "/usuarios",
          element: <Usuarios />,
        },
      ],
    },
    { errorElement: <div>erro</div> },
  ],
  {
    basename: import.meta.env.VITE_SUBDOMAIN ?? '',
  },
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
