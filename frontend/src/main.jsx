import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import "./styles/index.scss";

import App from "./App";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Cars from "./pages/Cars";
import Reservation from "./pages/Reservation";
import RegisterInfos from "./pages/RegisterInfos";
import RegisterCars from "./pages/RegisterCars";
import RegisterManager from "./components/RegisterManager";
import ModifProfil from "./pages/ModifProfil";
import BackOfficeUtilisateur from "./pages/BackOfficeUtilisateur";
import BackOfficeAccueil from "./pages/BackOfficeAccueil";
import BackOfficeModifProfil from "./pages/backOfficeModifProfil";
import MakeReservation from "./pages/MakeReservation";
import BackOfficeCars from "./pages/BackOfficeCars";
import NewCar from "./pages/NewCar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider>
        <App />
      </ContextProvider>
    ),

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterManager />,
        children: [
          { path: "/register/logs", element: <Register /> },
          { path: "/register/infos", element: <RegisterInfos /> },
        ],
      },
      { path: "/register/cars", element: <RegisterCars /> },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cars",
        element: <Cars />,
      },
      {
        path: "/newcar",
        element: <NewCar />,
      },
      {
        path: "/reservation",
        element: <Reservation />,
      },
      {
        path: "/modifprofil",
        element: <ModifProfil />,
      },
      {
        path: "/backofficeutilisateur",
        element: <BackOfficeUtilisateur />,
      },
      {
        path: "/backofficeaccueil",
        element: <BackOfficeAccueil />,
      },
      {
        path: "/backofficemodifprofil/:userId",
        element: <BackOfficeModifProfil />,
      },
      {
        path: "/makereservation",
        element: <MakeReservation />,
      },
      {
        path: "/backofficecars",
        element: <BackOfficeCars />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>

  <RouterProvider router={router} />

  // </React.StrictMode>
);
