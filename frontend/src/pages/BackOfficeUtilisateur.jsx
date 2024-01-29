import { useState, useEffect } from "react";
import { MDBDatatable, MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBarBackOffice from "../components/NavBarBackOffice";
import { useTheContext } from "../context/Context";

export default function BackOfficeUtilisateur() {
  const [userData, setUserData] = useState(null);
  // État pour gérer l'affichage de la boîte de dialogue de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  // État pour stocker l'ID du véhicule à supprimer
  const [userToDelete, setUserToDelete] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [confirmedDelete, setConfirmedDelete] = useState(false);

  const { apiService } = useTheContext();
  const navigate = useNavigate();

  // Utilisation de useNavigate pour la navigation
  const fetchData = async () => {
    try {
      const response = await apiService.get(`/users`);
      setUserData(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/backoffice/modifprofil/${userId}`); // Utilisation de navigate pour la redirection
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    "id",
    "email",
    "first_name",
    "last_name",
    "birth_date",
    "postal_code",
    "city",
    "modification",
  ];

  // Fonction pour ouvrir la boîte de dialogue de confirmation
  const openConfirmationDialog = (userId) => {
    setUserToDelete(userId);
    setShowConfirmation(true);
  };
  const cancelDeleteUser = () => {
    // Annuler la suppression en fermant la boîte de dialogue
    setShowConfirmation(false);
  };

  // Fonction pour confirmer la suppression du véhicule
  const confirmDeleteUser = async (userId) => {
    try {
      await apiService.del(`/users/${userId}`);
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression

      // ...
      // Réinitialiser l'ID du véhicule à supprimer
      setUserToDelete(null);
      // Marquer la confirmation de suppression
      setConfirmedDelete(true);
      // Fermer la boîte de dialogue après la suppression réussie
      alert("Votre compte a bien été supprimé");
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    cancelDeleteUser();
  };
  const rows =
    userData?.map((user) => [
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.birth_date,
      user.postal_code,
      user.city,
      <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(user.id)} />,
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => openConfirmationDialog(user.id)}
      />,
    ]) ?? [];

  // Position de la boîte de dialogue de confirmation
  const dialogStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "hsl(0deg 0% 94.65%)",
    padding: "20px",
    zIndex: "1000",
    textAlign: "center",
    borderRadius: "5px",
    boxShadow: "10px 10px 10px 10px rgba(0.1, 0.1, 0.1, 0.1)",
  };

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBackOffice />
      <h2 className="bo-title">Data Utilisateur</h2>
      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="confirmation-dialog" style={dialogStyle}>
          <p>Voulez-vous vraiment supprimer votre compte ?</p>
          <div className="popup-btn">
            <MDBBtn size="sm" onClick={() => confirmDeleteUser(userToDelete)}>
              Oui
            </MDBBtn>
            <MDBBtn size="sm" onClick={cancelDeleteUser}>
              Annuler
            </MDBBtn>
          </div>
        </div>
      )}
    </div>
  );
}
