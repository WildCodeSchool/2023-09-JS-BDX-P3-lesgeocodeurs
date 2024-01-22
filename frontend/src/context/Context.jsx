import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import validator from "validator";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";

const theContext = createContext();

export function ContextProvider({ children }) {
  const navigate = useNavigate();

  // le state qui contient les infos du user connecté
  const [user, setUser] = useState(null);

  const logout = async () => {
    await setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  // eslint-disable-next-line consistent-return

  const getUserInfos = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      logout();
    }
    const token = jwtDecode(jwtToken);
    try {
      const data = await apiService.get(
        `http://localhost:3310/api/users/${token.id}`
      );
      setUser(data);
    } catch (error) {
      console.error(error.message);
      logout();
    }
  };

  // connexion : vérifie si les identifiants sont bons et met à jour le state "user"
  const login = async (credentials) => {
    try {
      const data = await apiService.post(
        "http://localhost:3310/api/users/login",
        credentials
      );
      localStorage.setItem("token", data.token);
      apiService.setToken(data.token);
      getUserInfos();
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("wrong cred");
    }
  };

  // inscription : stocke le nouveau user dans le localstorage
  const register = async (newUser) => {
    try {
      const data = await apiService.post(
        "http://localhost:3310/api/users",
        newUser
      );
      localStorage.setItem("token", data.token);
      apiService.setToken(data.token);
      navigate("/register/infos");
    } catch (err) {
      if (err.response) {
        const error = err.response.data.err;
        const token = JSON.stringify(err.response.data.token);
        if (error === "Compte existant") {
          alert(error);
          navigate("/login");
        } else if (error === "Half-register") {
          localStorage.setItem("token", token);
          navigate("/register/infos");
        } else {
          alert(error);
        }
      } else if (err.request) {
        console.error("Pas de réponse du serveur");
      } else {
        console.error(
          "Erreur lors de la préparation de la requête:",
          err.message
        );
      }
    }
  };

  // modification du profil : modifie le state "user" et le localStorage
  const editUser = async (newData) => {
    const jwtToken = apiService.getToken();
    // apiService.setToken(jwtToken);

    const token = jwtDecode(jwtToken);
    try {
      const response = await apiService.put(
        `http://localhost:3310/api/users/${token.id}`,
        newData
      );
      console.info(response);
      getUserInfos();
    } catch (err) {
      console.error(err);
    }
  };

  const countUsers = async () => {
    try {
      await axios.get(`http://localhost:3310/api/userscount`);
    } catch (err) {
      console.error(err);
    }
  };

  const countVehicle = async () => {
    try {
      await axios.get(`http://localhost:3310/api/vehiclecount`);
    } catch (err) {
      console.error(err);
    }
  };

  const countChargingpoint = async () => {
    try {
      await axios.get(`http://localhost:3310/api/chargingpointcount`);
    } catch (err) {
      console.error(err);
    }
  };

  // suppression du compte : vide le state "user" et modifie le localStorage

  const deleteUser = async () => {
    const jwtToken = apiService.getToken();
    const token = jwtDecode(jwtToken);
    try {
      await apiService.delete(`http://localhost:3310/api/users/${token.id}`);
      logout();

      alert("Votre compte a bien été supprimé");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUserAdmin = async (userId) => {
    try {
      await apiService.delete(`http://localhost:3310/api/users/${userId}`);
      alert("Le compte a bien été supprimé");
    } catch (err) {
      console.error(err);
    }
  };
  // elle parle d'elle même, c'est bien évidemment moi qui ai tout écris à la main..
  function calculerAge(dateOfBirth) {
    // Convertir la chaîne en objet Date
    const dob = new Date(dateOfBirth);

    // Obtenir la date actuelle
    const currentDate = new Date();

    // Calculer la différence en millisecondes entre la date actuelle et la date de naissance
    const timeDifference = currentDate - dob;

    // Convertir la différence en années
    const ageInMilliseconds = new Date(timeDifference);
    const age = ageInMilliseconds.getUTCFullYear() - 1970;

    return age;
  }
  const createNewCar = async (newCar) => {
    const jwtToken = localStorage.getItem("token");
    const token = jwtDecode(jwtToken);
    const completeCar = newCar;
    completeCar.user_id = token.id;
    try {
      await axios.post(`http://localhost:3310/api/vehicle`, completeCar);
      if (user) {
        navigate("/cars");
      } else {
        navigate("/myaccount");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const memoizedUserValue = useMemo(
    () => ({
      user,
      login,
      logout,
      register,
      calculerAge,
      editUser,
      deleteUser,
      deleteUserAdmin,
      getUserInfos,
      createNewCar,
      countUsers,
      countVehicle,
      countChargingpoint,
    }),
    [user]
  );

  return (
    <theContext.Provider value={memoizedUserValue}>
      {children}
    </theContext.Provider>
  );
}

ContextProvider.propTypes = { children: PropTypes.node.isRequired };
export const useTheContext = () => useContext(theContext);
