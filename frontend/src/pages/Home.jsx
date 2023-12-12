import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";

export default function Home() {
  return (
    <div className="home-container">
      <img className="img-home" src="./src/assets/Logo.png" alt="logo" />

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
      <button className="map-button" type="button">
        Accédez à la carte
      </button>
      <div className="slogan-container">
        <img className="img-road" src="./src/assets/road.jpg" alt="road" />
        <p className="slogan">
          Pour ne plus jamais être victime du coup de la panne...
          <br />
          GeoCode est là pour vous !
        </p>
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
              <MDBCardText>Trouve la borne la plus proche</MDBCardText>
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
              <MDBCardText>Trouve la borne la plus proche</MDBCardText>
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
              <MDBCardText>Trouve la borne la plus proche</MDBCardText>
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
              <MDBCardText>Trouve la borne la plus proche</MDBCardText>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}
