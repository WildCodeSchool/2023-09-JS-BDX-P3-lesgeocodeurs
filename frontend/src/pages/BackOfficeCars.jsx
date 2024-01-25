import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MDBDatatable, MDBBtn } from "mdb-react-ui-kit";
import NavBarBackOffice from "../components/NavBarBackOffice";
import apiService from "../services/api.service";

export default function BackOfficeCars() {
  const [userData, setUserData] = useState([]);
  const [plugTypes, setPlugTypes] = useState([]);
  // État pour gérer l'affichage de la boîte de dialogue de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  // État pour stocker l'ID du véhicule à supprimer
  const [carToDelete, setCarToDelete] = useState(null);
  const [confirmedDelete, setConfirmedDelete] = useState(false);

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

  useEffect(() => {
    fetchPlugTypes();
    fetchData();
  }, []);

  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }

  const handleEditCar = (carId) => {
    navigate(`/backoffice/modifcar/${carId}`); // Utilisation de navigate pour la redirection
  };

  console.info(confirmedDelete, carToDelete);

  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const openConfirmationDialog = (carId) => {
    setCarToDelete(carId);
    setShowConfirmation(true);
  };

  const cancelDeleteCar = () => {
    // Annuler la suppression en fermant la boîte de dialogue
    setShowConfirmation(false);
  };

  const confirmDeleteCar = async () => {
    try {
      await apiService.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/vehicle/${carToDelete}`
      );
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression

      // ...
      // Réinitialiser l'ID du véhicule à supprimer
      setCarToDelete(null);
      // Marquer la confirmation de suppression
      setConfirmedDelete(true);
      // Fermer la boîte de dialogue après la suppression réussie
      alert("Votre vehicle a bien été supprimé");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    cancelDeleteCar();
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
      onClick={() => openConfirmationDialog(vehicle.id)}
    />,
  ]);

  // Position de la boîte de dialogue de confirmation
  const [dialogStyle, setDialogStyle] = useState({
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    zIndex: "1000",
    textAlign: "center",
  });
  console.info(setDialogStyle);

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBackOffice />

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="confirmation-dialog" style={dialogStyle}>
          <p>Voulez-vous vraiment supprimer votre compte ?</p>
          <MDBBtn size="sm" onClick={confirmDeleteCar}>
            Oui
          </MDBBtn>
          <MDBBtn size="sm" onClick={cancelDeleteCar}>
            Annuler
          </MDBBtn>
        </div>
      )}
    </div>
  );
}
