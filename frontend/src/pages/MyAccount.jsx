import React, { useState } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useTheContext } from "../context/Context";
import apiService from "../services/api.service";

export default function MyAccount() {
  const { logout, user, calculerAge } = useTheContext();

  const userAge = calculerAge(
    user ? user.birth_date : "1995-01-01T00:00:00.000Z'"
  );

  // État pour gérer l'affichage de la boîte de dialogue de confirmation
  const [showConfirmation, setShowConfirmation] = useState(false);
  // État pour stocker l'ID du véhicule à supprimer
  // eslint-disable-next-line no-unused-vars
  const [userToDelete, setUserToDelete] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [confirmedDelete, setConfirmedDelete] = useState(false);
  // Fonction pour ouvrir la boîte de dialogue de confirmation

  // Fonction pour confirmer la suppression du véhicule
  const confirmDeleteUser = async () => {
    const jwtToken = apiService.getToken();
    const token = jwtDecode(jwtToken);
    try {
      await apiService.del(`/users/${token.id}`);
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression
      // ...
      // Réinitialiser l'ID du véhicule à supprimer
      // Marquer la confirmation de suppression
      setConfirmedDelete(true);
      // Fermer la boîte de dialogue après la suppression réussie
      logout();
      alert("Votre compte a bien été supprimé");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // Position de la boîte de dialogue de confirmation
  const dialogStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    zIndex: "1000",
    textAlign: "center",
  };

  return (
    <div className="myAccount-container">
      <h1 className="profil-title">Mon Compte</h1>
      <div className="identity">
        <p>
          {user?.first_name} {user?.last_name}
        </p>
        <p>{userAge} ans</p>
        <p>{user?.city}</p>
        <p>{user?.email}</p>
      </div>
      <div className="profil-container">
        <Link to="/cars">
          <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
            <p>Mes véhicules</p>
            <p>&rarr;</p>
          </MDBBtn>
        </Link>
        <Link to="/reservation">
          <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
            <p>Mes réservations</p>
            <p>&rarr;</p>
          </MDBBtn>
        </Link>

        <div className="modification-profil" />
        <Link to={`/modifprofil/${user.id}`}>
          <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
            <p>Modifier mon profil</p>
            <p>&rarr;</p>
          </MDBBtn>
        </Link>
        {user && user.is_admin ? (
          <Link to="/backoffice/accueil">
            <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
              <p>BackOffice</p>
              <p>&rarr;</p>
            </MDBBtn>
          </Link>
        ) : null}
        <Link to="/">
          <MDBBtn
            className="buttonprofil"
            color="light"
            rippleColor="dark"
            // TO DO : ajouter un onClick ici pour modifier context et localstorage
            onClick={() => logout()}
          >
            <p>Me déconnecter</p>
            <p>&rarr;</p>
          </MDBBtn>
        </Link>
        <MDBBtn
          className="buttonprofil"
          color="light"
          rippleColor="dark"
          onClick={() => setShowConfirmation(true)}
        >
          <p>Supprimer</p>
        </MDBBtn>
      </div>
      {/* Boîte de dialogue de confirmation */}
      {showConfirmation && (
        <div className="confirmation-dialog" style={dialogStyle}>
          <p>Voulez-vous vraiment supprimer votre compte ?</p>
          <MDBBtn size="sm" onClick={confirmDeleteUser}>
            Oui
          </MDBBtn>
          <MDBBtn size="sm" onClick={() => setShowConfirmation()}>
            Annuler
          </MDBBtn>
        </div>
      )}
    </div>
  );
}
