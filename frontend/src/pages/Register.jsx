import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { useTheContext } from "../context/Context";

export default function Register() {
  const { handleInputRegister, userRegister, isValidEmail } = useTheContext();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    // postUser();
  };
  const isDisabled =
    userRegister.password !== userRegister.confirmPassword ||
    (userRegister.password && userRegister.password.length < 8) || // Vérifie la longueur seulement si le mot de passe est défini
    !/\d/.test(userRegister.password) || // Vérifie la présence de chiffres
    !/[!@#$%^&*(),.?":{}|<>]/.test(userRegister.password) || // Vérifie la présence de ponctuations
    userRegister.password.trim() === "" ||
    !isValidEmail; // Vérifie si le champ est vide

  return (
    <div className="register-container">
      <form className="login-form" onSubmit={handleSubmitRegister}>
        <h1>S'inscrire</h1>
        <MDBInput
          className="mb-4"
          type="email"
          required
          name="email"
          label="Addresse email"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="password"
          name="password"
          label="Mot de passe"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="password"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          onChange={handleInputRegister}
        />
        {isDisabled ? (
          <span>
            {/* Utiliser un autre élément pour simuler la désactivation */}
            <MDBBtn type="button" className="mb-4" block disabled>
              Suivant
            </MDBBtn>
            {userRegister.password !== userRegister.confirmPassword && (
              <p>Les mots de passe ne correspondent pas</p>
            )}
            {userRegister.password && userRegister.password.length < 8 && (
              <p>Le mot de passe doit contenir au moins 8 caractères</p>
            )}
            {!/\d/.test(userRegister.password) && (
              <p>Le mot de passe doit contenir au moins un chiffre</p>
            )}
            {!/[!@#$%^&*(),.?":{}|<>]/.test(userRegister.password) && (
              <p>Le mot de passe doit contenir au moins une ponctuation</p>
            )}
            {userRegister?.password?.trim() === "" && (
              <p>Le champ du mot de passe ne peut pas être vide</p>
            )}
            {userRegister.email && !isValidEmail && (
              <p>Entrez un email correct</p>
            )}
          </span>
        ) : (
          <Link to="/register/infos">
            {/* Utiliser <Link> normalement */}
            <MDBBtn type="submit" className="mb-4" block>
              Suivant
            </MDBBtn>
          </Link>
        )}
      </form>
    </div>
  );
}
