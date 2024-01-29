import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function Cars() {
  const [plugTypes, setPlugTypes] = useState([]);
  // État pour gérer l'affichage de la boîte de dialogue de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  // État pour stocker l'ID du véhicule à supprimer
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [confirmedDelete, setConfirmedDelete] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const { apiService } = useTheContext();
  const navigate = useNavigate();

  const fetchData = async () => {
    const jwtToken = localStorage.getItem("token");
    const token = jwtDecode(jwtToken);
    try {
      const response = await apiService.get(`/vehicle/users/${token.id}`);
      setVehicles(response);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
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

  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const openConfirmationDialog = (carId) => {
    setVehicleToDelete(carId);
    setShowConfirmation(true);
  };

  // Fonction pour confirmer la suppression du véhicule
  const confirmDeleteCar = async () => {
    try {
      await apiService.del(`/vehicle/${vehicleToDelete}`);
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression
      // ...
      // Réinitialiser l'ID du véhicule à supprimer
      setVehicleToDelete(null);
      // Marquer la confirmation de suppression
      setConfirmedDelete(true);
      // Fermer la boîte de dialogue après la suppression réussie
      fetchData();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
    setShowConfirmation(false);
  };

  useEffect(() => {
    fetchPlugTypes();
    fetchData();
  }, []);

  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }

  return (
    <div className="cars-container">
      <button
        type="submit"
        className="back"
        onClick={() => navigate("/myaccount")}
      >
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
        <div
          className="confirmation-dialog"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: "1000",
            textAlign: "center",
          }}
        >
          <p>Voulez-vous vraiment supprimer ce véhicule ?</p>
          <MDBBtn size="sm" onClick={confirmDeleteCar}>
            Oui
          </MDBBtn>
          <MDBBtn size="sm" onClick={() => setShowConfirmation(false)}>
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
