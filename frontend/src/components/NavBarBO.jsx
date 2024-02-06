import { Link } from "react-router-dom";

export default function NavBarBO() {
  return (
    <div className="navbar-bo-container">
      <Link to="/backoffice/accueil" className="navbar-bo-btn">
        Back Office
      </Link>
      <Link to="/backoffice/utilisateur" className="navbar-bo-btn">
        Utilisateurs
      </Link>
      <Link to="/backoffice/cars" className="navbar-bo-btn">
        Véhicules
      </Link>
    </div>
  );
}
