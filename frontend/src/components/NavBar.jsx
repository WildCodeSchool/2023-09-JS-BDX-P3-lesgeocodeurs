import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function NavBar() {
  const { userConected } = useTheContext();

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
      <Link to={userConected ? "/account" : "/login"} className="navbar-button">
        <span className="material-symbols-outlined">account_circle</span>
        <p className="navbar-title">Compte</p>
      </Link>
    </div>
  );
}
