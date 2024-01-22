import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function MyAccount() {
  const { logout, user, calculerAge, deleteUser } = useTheContext();

  const userAge = calculerAge(
    user ? user.birth_date : "1995-01-01T00:00:00.000Z'"
  );

  return (
    <div>
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
          <Link to="/modifprofil">
            <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
              <p>Modifier mon profil</p>
              <p>&rarr;</p>
            </MDBBtn>
          </Link>

          <Link to="/">
            <MDBBtn
              className="buttonprofil"
              color="light"
              rippleColor="dark"
              onClick={logout}
            >
              <p>Me déconnecter</p>
              <p>&rarr;</p>
            </MDBBtn>
          </Link>

          <MDBBtn
            className="buttonprofil"
            color="light"
            rippleColor="dark"
            // TO DO : ajouter un onClick ici pour modifier context et localstorage
            onClick={() => deleteUser()}
          >
            <p>Supprimer mon compte</p>
            <p>&rarr;</p>
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}
