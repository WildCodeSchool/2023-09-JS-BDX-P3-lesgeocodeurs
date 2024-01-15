import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { MDBDatatable } from "mdb-react-ui-kit";
import NavBarBackOffice from "../components/NavBarBackOffice";

export default function BackOfficeCars() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3310/api/vehicle`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);
  const [plugTypes, setPlugTypes] = useState([]);
  useEffect(() => {
    const fetchPlugTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/plugTypes");
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

  const handleDeleteCar = async (carId) => {
    try {
      // Appeler l'API Backend pour supprimer le véhicule
      await axios.delete(`http://localhost:3310/api/vehicle/${carId}`);
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

    //  <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(vehicle.id)} />,
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => handleDeleteCar(vehicle.id)}
    />,
  ]);

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <h1>BackOffice Véhicules</h1>
      <NavBarBackOffice />

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
    </div>
  );
}
