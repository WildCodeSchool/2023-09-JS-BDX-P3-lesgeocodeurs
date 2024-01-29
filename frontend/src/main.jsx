import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/Context";
import apiService from "./services/api.service";
import FunctionsService from "./services/functions.service";
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
        // loader: async () => apiService.get(`/station`),
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
        loader: ({ params }) => FunctionsService.getUserInfos({ params }),
      },
      {
        path: "/backoffice",
        element: <BackOfficeManager />,
        loader: async () => FunctionsService.returnAdmin(),
        children: [
          {
            path: "/backoffice/utilisateur",
            element: <BackOfficeUtilisateur />,
          },
          {
            path: "/backoffice/accueil",
            element: <BackOfficeAccueil />,
          },
          {
            path: "/backoffice/modifprofil/:userId",
            element: <BackOfficeModifProfil />,
            loader: ({ params }) => FunctionsService.getUserInfos({ params }),
          },
          {
            path: "/backoffice/cars",
            element: <BackOfficeCars />,
          },
          {
            path: "/backoffice/modifcar/:carId",
            element: <BackOfficeModifCar />,
            loader: ({ params }) => FunctionsService.getCarInfos({ params }),
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
