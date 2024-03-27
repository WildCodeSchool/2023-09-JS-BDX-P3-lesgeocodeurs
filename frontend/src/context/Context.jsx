import { createContext, useContext, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const theContext = createContext();

export function ContextProvider({ apiService, children }) {
  const navigate = useNavigate();

  // le state qui contient les infos du user connecté
  const [user, setUser] = useState(null);

  const [modal, setModal] = useState("");
  const [yesNoModal, setYesNoModal] = useState();

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  // eslint-disable-next-line consistent-return

  /* fonction qui vérifie le token :
    - déconnecte si pas de token ou non valide ou expiré
    - remplit state user avec les infos du token */
  const getUserInfos = async () => {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      logout();
    }
    const token = jwtDecode(jwtToken);
    try {
      const data = await apiService.get(`/users/${token.id}`);
      setUser(data);
    } catch (err) {
      if (err.response.status === 403) {
        logout();
      }
    }
  };

  // modification du profil : modifie le state "user" et le localStorage
  const editUser = async (newData, link) => {
    const jwtToken = apiService.getToken();
    const token = jwtDecode(jwtToken);
    try {
      await apiService.put(`/users/${token.id}`, newData);
      getUserInfos();
      navigate(link);
    } catch (err) {
      console.error(err);
    }
  };

  const countUsers = async () => {
    try {
      await apiService.get(`/users/count`);
    } catch (err) {
      console.error(err);
    }
  };

  const countVehicle = async () => {
    try {
      await apiService.get(`/vehicle/count`);
    } catch (err) {
      console.error(err);
    }
  };

  const countChargingpoint = async () => {
    try {
      await apiService.get(`/chargingpoint/count`);
    } catch (err) {
      console.error(err);
    }
  };

  // suppression du compte : vide le state "user" et modifie le localStorage
  const deleteUser = async () => {
    const jwtToken = apiService.getToken();
    const token = jwtDecode(jwtToken);
    try {
      await apiService.del(`/users/${token.id}`);
      logout();

      setModal("Votre compte a bien été supprimé");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUserAdmin = async (userId) => {
    try {
      await apiService.del(`/users/${userId}`);
      setModal("Le compte a bien été supprimé");
    } catch (err) {
      console.error(err);
    }
  };

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

  const createNewCar = async (newCar, navTo) => {
    const jwtToken = localStorage.getItem("token");
    const token = jwtDecode(jwtToken);
    const completeCar = newCar;
    completeCar.user_id = token.id;
    try {
      await apiService.post(`/vehicle`, completeCar);
      navigate(navTo);
    } catch (err) {
      console.error(err);
    }
  };

  const memoizedUserValue = useMemo(
    () => ({
      user,
      apiService,
      logout,
      calculerAge,
      editUser,
      deleteUser,
      deleteUserAdmin,
      getUserInfos,
      createNewCar,
      countUsers,
      countVehicle,
      countChargingpoint,
      modal,
      setModal,
      yesNoModal,
      setYesNoModal,
    }),
    [user, apiService, modal, yesNoModal]
  );

  return (
    <theContext.Provider value={memoizedUserValue}>
      {children}
    </theContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  apiService: PropTypes.shape().isRequired,
};

export const useTheContext = () => useContext(theContext);
