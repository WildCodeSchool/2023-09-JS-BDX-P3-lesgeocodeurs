import { useState, useEffect } from "react";
import axios from "axios";

import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardBody,
} from "mdb-react-ui-kit";
import NavBarBackOffice from "../components/NavBarBackOffice";

export default function BAckOfficeAccueil() {
  const [usersNbr, setUsersNbr] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/userscount`
        );
        setUsersNbr(response.data);
      } catch (error) {
        console.error("Error fetching usersCount:", error);
      }
    };
    fetchData();
  }, []); // Ajout d'une dépendance vide pour exécuter useEffect une seule fois

  return (
    <div className="backofficeaccueil_container">
      <h1>BackOffice Acceuil</h1>
      <NavBarBackOffice />

      <div className="dashboard_container">
        <MDBContainer fluid>
          <MDBRow className="justify-content-center">
            <MDBCol md="10">
              <section>
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
                        <h2 className="mb-0">146,926</h2>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>

                  <MDBCol md="4" className="mb-md-0">
                    <MDBCard>
                      <MDBCardBody>
                        <p className="text-muted mb-1">Bornes Répertoriées</p>
                        <h2 className="mb-0">24.57%</h2>
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
