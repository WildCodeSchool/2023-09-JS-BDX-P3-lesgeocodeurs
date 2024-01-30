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
    navigate(`/backoffice/modifprofil/${userId}`);
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

  // Fonction pour confirmer la suppression de l'utilisateur
  const confirmDeleteUser = async (userId) => {
    try {
      await apiService.del(`/users/${userId}`);
      setUserToDelete(null);
      alert("Le compte a bien été supprimé");
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
        <div className="confirmation-dialog">
          <p>Voulez-vous vraiment supprimer ce compte ?</p>
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
