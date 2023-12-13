import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function Register() {
  const { userRegister, setUserRegister } = useTheContext();
  const handleInput = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // postUser();
  };
  const isDisabled =
    userRegister.password !== userRegister.confirmPassword ||
    (userRegister.password && userRegister.password.length < 8) || // Vérifie la longueur seulement si le mot de passe est défini
    !/\d/.test(userRegister.password) || // Vérifie la présence de chiffres
    !/[!@#$%^&*(),.?":{}|<>]/.test(userRegister.password) || // Vérifie la présence de ponctuations
    userRegister.password.trim() === ""; // Vérifie si le champ est vide

  return (
    <div className="register-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <MDBInput
          className="mb-4"
          type="email"
          name="email"
          id="form2Example1"
          label="Addresse email"
          onChange={handleInput}
        />
        <MDBInput
          className="mb-4"
          type="password"
          name="password"
          id="form2Example2"
          label="Mot de passe"
          onChange={handleInput}
        />
        <MDBInput
          className="mb-4"
          type="password"
          name="confirmPassword"
          id="form2Example2"
          label="Confirmer le mot de passe"
          onChange={handleInput}
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
          </span>
        ) : (
          <Link to="/">
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
