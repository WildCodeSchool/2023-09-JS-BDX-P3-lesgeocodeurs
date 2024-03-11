import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import colorLogo from "../assets/Logo.png";
import mapImg from "../assets/carte.home.png";
import reservationImg from "../assets/reservation.png";
import stationImg from "../assets/cars.logo.home.png";
import plugImg from "../assets/prise.png";
import AnimHome from "../components/AnimHome";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={colorLogo} alt="logo" />
      </div>
      <AnimHome />
      <div className="slogan">
        Pour ne plus jamais être victime du coup de la panne...
      </div>
      <div className="button-map-container">
        <MDBBtn className="mb-4" onClick={() => navigate("/map")}>
          Accédez à la Carte
        </MDBBtn>
      </div>

      <div className="card-container">
        <div className="card">
          <img src={mapImg} alt="map" />
          <div>Trouvez la station la plus proche</div>
        </div>
        <div className="card">
          <img src={reservationImg} alt="reservation" />
          <div>Réservez une borne</div>
        </div>
        <div className="card">
          <img src={stationImg} alt="station" />
          <div>Gérez vos véhicules</div>
        </div>
        <div className="card">
          <img src={plugImg} alt="plug" />
          <div>Trouvez le bon type de prise</div>
        </div>
      </div>
      <div className="contact">
        <Link to="/contact">Une question ? Contactez-nous </Link>
      </div>
    </div>
  );
}
