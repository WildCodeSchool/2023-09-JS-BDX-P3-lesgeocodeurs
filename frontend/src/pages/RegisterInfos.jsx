import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterInfos() {
  const { userRegister, setUserRegister } = useTheContext();
  const handleInput = (e) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // postUser();
  };
  return (
    <div className="registerInfos-container">
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
          name="password"
          id="form2Example2"
          label="Confirmer le mot de passe"
          onChange={handleInput}
        />

        <Link to="/">
          <MDBBtn type="submit" className="mb-4" block>
            Suivant
          </MDBBtn>
        </Link>
      </form>
    </div>
  );
}
