import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBRow,
  MDBCard,
  MDBCol,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useState } from "react";

export default function BAckOfficeAccueil() {
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className="backofficeaccueil_container">
      <h1>BackOffice Acceuil</h1>
      <div>
        <MDBNavbar expand="lg" light bgColor="light">
          <MDBContainer fluid>
            <MDBNavbarBrand className="title_back" href="#">
              Back Office
            </MDBNavbarBrand>
            <MDBNavbarToggler
              type="button"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setOpenNav(!openNav)}
            />
            <MDBCollapse navbar open={openNav}>
              <MDBNavbarNav>
                <MDBNavbarItem>
                  <MDBNavbarLink
                    active
                    aria-current="page"
                    href="/BackOfficeUtilisateur"
                  >
                    Utilisateurs
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="#">Véhicules</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="#">Bornes</MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </div>
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
                        <h2 className="mb-0">71,897</h2>
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
