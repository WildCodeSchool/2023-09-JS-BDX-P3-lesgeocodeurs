import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cars() {
  function rtn() {
    window.history.back();
  }
  const [plugTypes, setPlugTypes] = useState([]);
  const navigate = useNavigate();
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

  // État pour gérer l'affichage de la boîte de dialogue de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  // État pour stocker l'ID du véhicule à supprimer
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [confirmedDelete, setConfirmedDelete] = useState(false);
  console.info(confirmedDelete);
  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const openConfirmationDialog = (carId) => {
    setVehicleToDelete(carId);
    setShowConfirmation(true);
  };
  const cancelDeleteCar = () => {
    // Annuler la suppression en fermant la boîte de dialogue
    setShowConfirmation(false);
  };

  // Fonction pour confirmer la suppression du véhicule
  const confirmDeleteCar = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/vehicle/${vehicleToDelete}`
      );
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression
      // ...
      // Réinitialiser l'ID du véhicule à supprimer
      setVehicleToDelete(null);
      // Marquer la confirmation de suppression
      setConfirmedDelete(true);
      // Fermer la boîte de dialogue après la suppression réussie
    } catch (error) {
      console.error("Error deleting car:", error);
    }
    cancelDeleteCar();
  };

  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }
  const handleDeleteCar = async (carId) => {
    try {
      // Appeler l'API Backend pour supprimer le véhicule
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/vehicle/${carId}`
      );
      navigate("/cars");
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression
      // ...
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("token");
      const token = jwtDecode(jwtToken);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/vehicle/users/${token.id}`
        );
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, [handleDeleteCar]);
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

  return (
    <div className="cars-container">
      <button type="submit" className="back" onClick={rtn}>
        &larr; Retour
      </button>
      <h1 className="cars-title">Mes véhicules</h1>
      <div className="my-car">
        <MDBCard border>
          {vehicles.map((car) => (
            <div className="one-car" key={car.model}>
              <MDBCardBody>
                <div>
                  <MDBCardTitle>
                    {car.brand} {car.model}
                  </MDBCardTitle>
                  <MDBCardText>
                    Type de prise : {getPlugTypeName(car.plug_type_id)}
                  </MDBCardText>
                </div>
                <div className="btn-delete-car">
                  <MDBBtn
                    size="sm"
                    onClick={() => openConfirmationDialog(car.id)}
                  >
                    Supprimer
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </div>
          ))}
        </MDBCard>
      </div>
      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="confirmation-dialog" style={dialogStyle}>
          <p>Voulez-vous vraiment supprimer ce véhicule ?</p>
          <MDBBtn size="sm" onClick={confirmDeleteCar}>
            Oui
          </MDBBtn>
          <MDBBtn size="sm" onClick={cancelDeleteCar}>
            Annuler
          </MDBBtn>
        </div>
      )}
      <div className="add-car">
        <Link to="/newcar">
          <MDBBtn type="submit" className="mb-4" block>
            Ajouter un véhicule
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
