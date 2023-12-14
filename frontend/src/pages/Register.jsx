import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import { useTheContext } from "../context/Context";

export default function Register() {
  const { handleInputRegister, userRegister, isValidEmail } = useTheContext();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    // postUser();
  };
  const formErrors = [];

  if (userRegister.password !== userRegister.confirmPassword) {
    formErrors.push("Les mots de passe ne correspondent pas");
  }
  if (userRegister.email && !isValidEmail) {
    formErrors.push("L'adresse email n'est pas valide");
  }
  if (userRegister.password && userRegister.password.length < 8) {
    formErrors.push("Le mot de passe doit contenir au moins 8 caractères");
  }
  if (!/\d/.test(userRegister.password)) {
    formErrors.push(
      "le champ  de mot de passe doit contenir au moins un chiffre"
    );
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(userRegister.password)) {
    formErrors.push("Le mot de passe doit contenir au moins une ponctuation");
  }
  if (userRegister?.password?.trim() === "") {
    formErrors.push("Le champ du mot de passe ne peut pas être vide");
  }

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

        <Link to="/register/infos">
          <MDBBtn
            type="submit"
            className="mb-4"
            block
            disabled={formErrors.length !== 0}
          >
            Suivant
          </MDBBtn>
        </Link>
        {formErrors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </form>
    </div>
  );
}
