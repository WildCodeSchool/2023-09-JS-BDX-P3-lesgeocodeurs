import { Link } from "react-router-dom";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";

export default function Login() {
  const { handleLogin, login, userConected } = useTheContext();

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
        <MDBCol>
          <a href="#!">Mot de passe oublié? </a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" className="mb-4" block onClick={login}>
        Connexion
      </MDBBtn>

      <div className="text-center">
        {!userConected ? (
          <p>
            Nouveau membre ? <Link to="/register/logs">S'inscrire</Link>
          </p>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
