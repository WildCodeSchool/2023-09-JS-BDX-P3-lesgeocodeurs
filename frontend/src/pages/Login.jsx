import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";

export default function Login() {
  const { login } = useTheContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="login-form">
      <h1>Se Connecter</h1>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        label="Addresse email"
        value={formData.email}
        onChange={handleChange}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        label="Mot de passe"
        value={formData.password}
        onChange={handleChange}
      />

      <MDBRow className="mb-4">
        <MDBCol>
          <a href="#!">Mot de passe oublié? </a>
        </MDBCol>
      </MDBRow>

      <MDBBtn
        type="submit"
        className="mb-4"
        block
        onClick={() => login(formData)}
      >
        Connexion
      </MDBBtn>

      <div className="text-center">
        <p>
          Nouveau membre ? <Link to="/register/logs">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}
