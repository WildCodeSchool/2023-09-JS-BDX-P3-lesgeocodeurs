import { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";
import NavBarBO from "../components/NavBarBO";

export default function BAckOfficeAccueil() {
  const [usersNbr, setUsersNbr] = useState();
  const [vehicleNbr, setVehicleNbr] = useState();
  const [chargingpointNbr, setchargingpointNbr] = useState();
  const { apiService } = useTheContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/users/count`);
        setUsersNbr(response);
      } catch (error) {
        console.error("Error fetching usersCount:", error);
      }
    };
    fetchData();
  }, []); // Ajout d'une dépendance vide pour exécuter useEffect une seule fois

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/vehicle/count`);
        setVehicleNbr(response);
      } catch (error) {
        console.error("Error fetching vehicleCount:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get(`/chargingpoint/count`);
        setchargingpointNbr(response);
      } catch (error) {
        console.error("Error fetching chargingpointCount:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="backofficeaccueil_container">
      <NavBarBO />

      <div className="dashboard_container">
        <MDBContainer fluid>
          <MDBRow className="justify-content-center">
            <MDBCol md="10">
              <section>
                <div>Bienvenue dans votre BackOffice !</div>
                <br />
                <h5 className="mb-4">Chiffres Clés</h5>
                <MDBRow>
                  <MDBCol md="4" className="mb-md-0">
                    <MDBCard>
                      <MDBCardBody>
                        <p className="text-muted mb-1">
                          Utilisateurs Enregistrés
                        </p>
                        <h2 className="mb-0">
                          {usersNbr && usersNbr.user_count}
                        </h2>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol md="4" className="mb-md-0">
                    <MDBCard>
                      <MDBCardBody>
                        <p className="text-muted mb-1">Véhicules Enregistrés</p>
                        <h2 className="mb-0">
                          {vehicleNbr && vehicleNbr.vehicle_count}
                        </h2>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol md="4" className="mb-md-0">
                    <MDBCard>
                      <MDBCardBody>
                        <p className="text-muted mb-1">Bornes Répertoriées</p>
                        <h2 className="mb-0">
                          {chargingpointNbr &&
                            chargingpointNbr.charging_point_count}
                        </h2>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </section>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
}
