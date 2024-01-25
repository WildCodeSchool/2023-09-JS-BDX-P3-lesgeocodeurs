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
import MakeReservation from "./pages/MakeReservation";
import BackOfficeCars from "./pages/BackOfficeCars";
import NewCar from "./pages/NewCar";
import NewReservation from "./pages/NewReservation";
import BackOfficeModifCar from "./pages/BackOfficeModifCar";
import BackOfficeManager from "./components/BackOfficeManager";

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
        // loader: async () => apiService.get(`${import.meta.env.VITE_BACKEND_URL}/api/station`),
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
          apiService.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/chargingpoint/${params.id}`
          ),
      },
      {
        path: "/modifprofil",
        element: <ModifProfil />,
        loader: async ({ params }) => {
          try {
            const data = await apiService.get(
              `${import.meta.env.VITE_BACKEND_URL}/api/users/${params.userId}`
            );

            return { preloadedUserData: data };
          } catch (error) {
            // TODO: redirect to other page
            return null;
          }
        },
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
            path: "/backofficemodifprofil/:userId",
            element: <BackOfficeModifProfil />,
            loader: async ({ params }) => {
              try {
                const data = await apiService.get(
                  `http://localhost:3310/api/users/${params.userId}`
                );
                return { preloadedUserData: data };
              } catch (error) {
                // TODO: redirect to other page
                return null;
              }
            },
          },
          {
            path: "/backoffice/cars",
            element: <BackOfficeCars />,
          },
          {
            path: "/backoffice/modifcar/:carId",
            element: <BackOfficeModifCar />,
            loader: async ({ params }) => {
              try {
                const data = await apiService.get(
                  `http://localhost:3310/api/vehicle/${params.carId}`
                );
                return { preloadedCarData: data };
              } catch (error) {
                // TODO: redirect to other page
                return null;
              }
            },
          },
        ],
      },

      {
        path: "/makereservation",
        element: <MakeReservation />,
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
