import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import apiService from "./services/api.service";
import functionsService from "./services/functions.service";
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
import BackOfficeCars from "./pages/BackOfficeCars";
// eslint-disable-next-line import/no-named-as-default
import NewCar from "./pages/NewCar";
import NewReservation from "./pages/NewReservation";
import BackOfficeModifCar from "./pages/BackOfficeModifCar";
import BackOfficeManager from "./components/BackOfficeManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ContextProvider apiService={apiService}>
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
        path: "/newreservation/:id",
        element: <NewReservation />,
        loader: async ({ params }) =>
          apiService.get(`/chargingpoint/${params.id}`),
      },
      {
        path: "/modifprofil/:userId",
        element: <ModifProfil />,
        loader: async ({ params }) =>
          functionsService.getUserInfos(params.userId),
      },
      {
        path: "/backoffice",
        element: <BackOfficeManager />,
        loader: async () => functionsService.returnAdmin(),
        children: [
          {
            path: "/backoffice/accueil",
            element: <BackOfficeAccueil />,
          },
          {
            path: "/backoffice/utilisateur",
            element: <BackOfficeUtilisateur />,
          },
          {
            path: "/backoffice/cars",
            element: <BackOfficeCars />,
          },
          {
            path: "/backoffice/modifprofil/:userId",
            element: <BackOfficeModifProfil />,
            loader: async ({ params }) =>
              functionsService.getUserInfos(params.userId),
          },
          {
            path: "/backoffice/modifcar/:carId",
            element: <BackOfficeModifCar />,
            loader: async ({ params }) =>
              functionsService.getCarInfos(params.carId),
          },
        ],
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
