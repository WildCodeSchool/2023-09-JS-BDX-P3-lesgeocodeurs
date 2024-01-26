import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";
import colorLogo from "../assets/Logo.png";
import carVideo from "../assets/home.video.mp4";
import roadImg from "../assets/road.jpg";
import mapImg from "../assets/carte.png";
import reservationImg from "../assets/reservation.png";
import stationImg from "../assets/cars.logo.home.png";
import plugImg from "../assets/prise.png";

export default function Home() {
  return (
    <div className="home-container">
      <img className="img-home" src={colorLogo} alt="logo" />
      <p className="slogan">
        Pour ne plus jamais être victime du coup de la panne...
        <br />
        GeoCode est là pour vous !
      </p>
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
      <div className="button-map-container">
        <MDBBtn type="submit" className="mb-4" block>
          <Link to="/map">Accédez à la Carte</Link>
        </MDBBtn>
      </div>
      <div className="img-road-container">
        <img className="img-road" src={roadImg} alt="road" />
        <div className="overlay" />
      </div>
      <div className="card-container">
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={mapImg} fluid alt="carte" />

            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            />
          </MDBRipple>
          <MDBCardBody>
            <MDBCardText className="card-text">
              Trouve la borne la plus proche
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={reservationImg} fluid alt="reservation" />

            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            />
          </MDBRipple>
          <MDBCardBody>
            <MDBCardText className="card-text">Réserver une borne</MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={stationImg} fluid alt="carslogo" />

            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            />
          </MDBRipple>
          <MDBCardBody>
            <MDBCardText className="card-text">Gérer mes véhicules</MDBCardText>
          </MDBCardBody>
        </MDBCard>
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src={plugImg} fluid alt="prise" />

            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            />
          </MDBRipple>
          <MDBCardBody>
            <MDBCardText className="card-text">
              Trouver le type de prise qui vous correspond
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
