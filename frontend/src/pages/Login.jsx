import { Link } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";

export default function Login() {
  const { handleLogin, validLogin } = useTheContext();

  return (
    <div className="login-form">
      <h1>Se Connecter</h1>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        label="Addresse email"
        onChange={handleLogin}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        label="Mot de passe"
        onChange={handleLogin}
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox label="Se souvenir de moi" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Mot de passe oublié? </a>
        </MDBCol>
      </MDBRow>
      <Link to="/">
        <MDBBtn type="submit" className="mb-4" block onClick={validLogin}>
          Connexion
        </MDBBtn>
      </Link>

      <div className="text-center">
        <p>
          Nouveau membre ? <Link to="/register/logs">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
