import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { MDBDatatable, MDBBtn } from "mdb-react-ui-kit";
// import NavBarBackOffice from "../components/NavBarBackOffice";
import { useTheContext } from "../context/Context";
import NavBarBO from "../components/NavBarBO";

export default function BackOfficeCars() {
  const [userData, setUserData] = useState([]);
  const [plugTypes, setPlugTypes] = useState([]);
  // État pour gérer l'affichage de la boîte de dialogue de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  // État pour stocker l'ID du véhicule à supprimer
  const [carToDelete, setCarToDelete] = useState(null);

  const { apiService } = useTheContext();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await apiService.get(`/vehicle`);
      setUserData(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const fetchPlugTypes = async () => {
    try {
      const response = await apiService.get(`/plugtypes`);
      setPlugTypes(response);
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

  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const openConfirmationDialog = (carId) => {
    setCarToDelete(carId);
    setShowConfirmation(true);
  };

  const confirmDeleteCar = async () => {
    try {
      await apiService.del(`/vehicle/${carToDelete}`);
      setCarToDelete(null);
      alert("Votre vehicle a bien été supprimé");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setShowConfirmation(false);
  };

  const columns = [
    "ID",
    "Marque",
    "Modèle",
    "Type de prise",
    "Modifier",
    "Supprimer",
  ];

  const rows = userData.map((vehicle) => [
    vehicle.id,
    vehicle.brand,
    vehicle.model,
    getPlugTypeName(vehicle.plug_type_id),
    <FontAwesomeIcon
      icon={faEdit}
      onClick={() => navigate(`/backoffice/modifcar/${vehicle.id}`)}
    />,
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => openConfirmationDialog(vehicle.id)}
    />,
  ]);

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBO />
      <h2 className="bo-title">Véhicules</h2>

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>

      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Voulez-vous vraiment supprimer votre compte ?</p>
          <div className="popup-btn">
            <MDBBtn size="sm" onClick={confirmDeleteCar}>
              Oui
            </MDBBtn>
            <MDBBtn size="sm" onClick={() => setShowConfirmation(false)}>
              Annuler
            </MDBBtn>
          </div>
        </div>
      )}
    </div>
  );
}
