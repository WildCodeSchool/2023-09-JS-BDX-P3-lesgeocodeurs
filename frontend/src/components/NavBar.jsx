export default function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-button">
        <span className="material-symbols-outlined">home</span>
        <p className="navbar-title">Accueil</p>
      </div>
      <div className="navbar-button">
        <span className="material-symbols-outlined">map</span>
        <p className="navbar-title">Carte</p>
      </div>
      <div className="navbar-button">
        <span className="material-symbols-outlined">account_circle</span>
        <p className="navbar-title">Compte</p>
      </div>
    </div>
  );
}
