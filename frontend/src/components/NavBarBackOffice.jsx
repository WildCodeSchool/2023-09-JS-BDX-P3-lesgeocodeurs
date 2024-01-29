import { useState } from "react";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function NavBarBackOffice() {
  const [openNav, setOpenNav] = useState(false);

  // Fonction pour obtenir la classe de l'icône en fonction de l'état de la barre de navigation
  const getIconClass = () => {
    return openNav ? "fas fa-chevron-up" : "fas fa-chevron-down";
  };
  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand className="title_back" href="/backoffice/accueil">
            Back Office
          </MDBNavbarBrand>

          <MDBCollapse navbar open={openNav}>
            <MDBNavbarNav>
              <MDBNavbarItem>
                <MDBNavbarLink
                  active
                  aria-current="page"
                  href="/backoffice/utilisateur"
                >
                  Utilisateurs
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/backoffice/cars">Véhicules</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
          <MDBBtn
            className="menu-btn-nav-bo"
            onClick={() => setOpenNav(!openNav)}
          >
            <i className={getIconClass()} />
          </MDBBtn>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}
