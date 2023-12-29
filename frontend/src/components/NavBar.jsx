import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function NavBar() {
  const { user } = useTheContext();

  return (
    <div className="the-navbar">
      <div className="desktop-only-container">
        <h1 className="home_title">GEOCODE</h1>
        <img src="./src/assets/logo-white 1.png" alt="Logo-white" />
      </div>
      <Link to="/" className="navbar-button">
        <span className="material-symbols-outlined">home</span>
        <p className="navbar-title">Accueil</p>
      </Link>
      <Link to="/map" className="navbar-button">
        <span className="material-symbols-outlined">map</span>
        <p className="navbar-title">Carte</p>
      </Link>
      <div className="navbar-button_connect">
        <Link
          className="navbar-button_profil"
          to={user ? "/myaccount" : "/login"}
        >
          <span className="material-symbols-outlined">account_circle</span>
          <p className="navbar-title">Compte</p>
        </Link>
        {user ? <span>🟢</span> : <span />}
      </div>
    </div>
  );
}
