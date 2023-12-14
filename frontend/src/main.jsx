import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import MyMap from "./pages/Map";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import RegisterInfos from "./pages/RegisterInfos";
import RegisterCars from "./pages/RegisterCars";
import RegisterManager from "./components/RegisterManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/map",
        element: <MyMap />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterManager />,
        children: [
          {
            path: "/register/logs",
            element: <Register />,
          },
          { path: "/register/infos", element: <RegisterInfos /> },
          { path: "/register/cars", element: <RegisterCars /> },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
