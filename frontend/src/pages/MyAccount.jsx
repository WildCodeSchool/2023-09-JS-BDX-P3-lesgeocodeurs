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

  // Fonction pour confirmer la suppression du véhicule
  const confirmDeleteUser = async () => {
    const jwtToken = apiService.getToken();
    const token = jwtDecode(jwtToken);
    try {
      await apiService.del(`/users/${token.id}`);
      logout();
      alert("Votre compte a bien été supprimé");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
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
        <Link to={`/modifprofil/${user?.id}`}>
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
        <div className="confirmation-dialog">
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
