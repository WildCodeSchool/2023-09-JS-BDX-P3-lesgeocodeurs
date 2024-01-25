import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MDBDatatable } from "mdb-react-ui-kit";
import NavBarBackOffice from "../components/NavBarBackOffice";
import apiService from "../services/api.service";

export default function BackOfficeCars() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/vehicle`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  fetchData();

  const [plugTypes, setPlugTypes] = useState([]);
  useEffect(() => {
    const fetchPlugTypes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/plugTypes`
        );
        setPlugTypes(response.data);
      } catch (error) {
        console.error("Error fetching plug types:", error);
      }
    };

    fetchPlugTypes();
  }, []);
  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }

  const handleEditCar = (carId) => {
    navigate(`/backofficemodifcar/${carId}`); // Utilisation de navigate pour la redirection
  };

  const handleDeleteCar = async (carId) => {
    try {
      // Appeler l'API Backend pour supprimer le véhicule
      await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/vehicle/${carId}`
      );
      fetchData();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const columns = ["id", "brand", "model", "type de prise"];
  const rows = userData.map((vehicle) => [
    vehicle.id,
    vehicle.brand,
    vehicle.model,
    getPlugTypeName(vehicle.plug_type_id),

    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditCar(vehicle.id)} />,
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => handleDeleteCar(vehicle.id)}
    />,
  ]);

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBackOffice />

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
    </div>
  );
}
