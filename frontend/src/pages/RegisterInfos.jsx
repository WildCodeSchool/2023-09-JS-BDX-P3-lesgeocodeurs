import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterInfos() {
  const { handleInputRegister } = useTheContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    // postUser();
  };
  return (
    <div className="registerInfos-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Mes infos</h1>
        <MDBInput
          className="mb-4"
          type="string"
          name="firstName"
          label="Prenom"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="name"
          label="Nom"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="date"
          name="birthDate"
          label="Date de naissance"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="number"
          required
          name="Postal"
          label="Code postal"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="city"
          name="city"
          label="Ville"
          onChange={handleInputRegister}
        />

        <Link to="/register/cars">
          <MDBBtn type="submit" className="mb-4" block>
            Suivant
          </MDBBtn>
        </Link>
      </form>
    </div>
  );
}
