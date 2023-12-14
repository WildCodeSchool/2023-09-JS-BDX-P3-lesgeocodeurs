import React from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function MyAccount() {
  return (
    <div>
      <div className="myAccount-container">
        <h1 className="profil-title">Mon Compte</h1>
        <div className="identity">
          <p>Damien Jean </p>
          <p>25 ans</p>
          <p>Bordeaux</p>
          <p>damien.jean@mail.com</p>
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
          <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
            <p>Modifier mon profil</p>
            <p>&rarr;</p>
          </MDBBtn>

          <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
            <p>Me déconnecter</p>
            <p>&rarr;</p>
          </MDBBtn>
          <MDBBtn className="buttonprofil" color="light" rippleColor="dark">
            <p>Supprimer mon compte</p>
            <p>&rarr;</p>
          </MDBBtn>
        </div>
      </div>
    </div>
  );
}