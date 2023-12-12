import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Home() {
  return (
    <div className="home-container">
      <img className="img-home" src="./src/assets/Logo.png" alt="logo" />
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
          loop="true"
          style={{ width: "100%", height: "100%" }}
        >
          <source src="./src/assets/home.video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="button-map-container">
        <MDBBtn type="submit" className="mb-4" block>
          Accédez à la carte
        </MDBBtn>
      </div>
      <div className="img-road-container">
        <img className="img-road" src="./src/assets/road.jpg" alt="road" />
        <div className="overlay" />
      </div>
      <div className="card-container">
        <MDBCard>
          <MDBRipple
            rippleColor="light"
            rippleTag="div"
            className="bg-image hover-overlay"
          >
            <MDBCardImage src="./src/assets/carte.png" fluid alt="carte" />

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
            <MDBCardImage
              src="./src/assets/reservation.png"
              fluid
              alt="reservation"
            />

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
            <MDBCardImage
              src="./src/assets/cars.logo.home.png"
              fluid
              alt="carslogo"
            />

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
            <MDBCardImage src="./src/assets/prise.png" fluid alt="prise" />

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
      </div>
    </div>
  );
}
