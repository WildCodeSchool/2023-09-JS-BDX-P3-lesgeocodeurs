import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import colorLogo from "../assets/Logo.png";
import carVideo from "../assets/home.video.mp4";
// import roadImg from "../assets/road.jpg";
import mapImg from "../assets/carte.png";
import reservationImg from "../assets/reservation.png";
import stationImg from "../assets/cars.logo.home.png";
import plugImg from "../assets/prise.png";

export default function Home() {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={colorLogo} alt="logo" />
      </div>
      <p className="slogan">
        Pour ne plus jamais être victime du coup de la panne...
        <br />
        GeoCode est là pour vous !
      </p>
      <div className="button-map-container">
        <MDBBtn type="submit" className="mb-4" block>
          <Link to="/map">Accédez à la Carte</Link>
        </MDBBtn>
      </div>
      <div className="video-container">
        <video
          preload="auto"
          autoPlay
          muted
          loop
          style={{ width: "100%", height: "100%" }}
        >
          <source src={carVideo} type="video/mp4" />
        </video>
      </div>
      {/* <div className="img-road-container">
        <img className="img-road" src={roadImg} alt="road" />
        <div className="overlay" />
      </div> */}
      <div className="card-container">
        <MDBCard>
          <MDBCardImage src={mapImg} fluid alt="carte" />
          <MDBCardBody>
            <MDBCardText className="card-text">
              Trouvez la borne la plus proche
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardImage src={reservationImg} fluid alt="reservation" />
          <MDBCardBody>
            <MDBCardText className="card-text">Réservez une borne</MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardImage src={stationImg} fluid alt="carslogo" />
          <MDBCardBody>
            <MDBCardText className="card-text">Gérez vos véhicules</MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBCardImage src={plugImg} fluid alt="prise" />
          <MDBCardBody>
            <MDBCardText className="card-text">
              Trouvez le type de prise qui vous correspond
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <p>
          <Link to="/contact">Une question ? Contactez-nous </Link>
        </p>
      </div>
    </div>
  );
}
