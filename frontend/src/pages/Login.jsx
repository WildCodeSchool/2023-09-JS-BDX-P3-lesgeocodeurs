import { useState } from "react";
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
  const { setUserConected } = useTheContext();
  const [logUser, setLogUser] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserConected(true);
    // getUser();
  };
  const handleInput = (e) => {
    setLogUser({ ...logUser, [e.target.name]: e.target.value });
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Se Connecter</h1>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        label="Addresse email"
        onChange={handleInput}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        label="Mot de passe"
        onChange={handleInput}
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox label="Se souvenir de moi" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Mot de passe oublié? </a>
        </MDBCol>
      </MDBRow>
      <MDBBtn type="submit" className="mb-4" block>
        Connexion
      </MDBBtn>

      <div className="text-center">
        <p>
          Nouveau membre ? <Link to="/register/logs">S'inscrire</Link>
        </p>
      </div>
    </form>
  );
}
