import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-button">
        <span className="material-symbols-outlined">home</span>
        <p className="navbar-title">Accueil</p>
      </Link>
      <Link to="/map" className="navbar-button">
        <span className="material-symbols-outlined">map</span>
        <p className="navbar-title">Carte</p>
      </Link>
      <Link to="/account" className="navbar-button">
        <span className="material-symbols-outlined">account_circle</span>
        <p className="navbar-title">Compte</p>
      </Link>
    </div>
  );
}
