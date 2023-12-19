import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterCars() {
  const { handleInputRegister, login } = useTheContext();
  const handleSubmitRegister = () => {
    login();
  };

  return (
    <div className="registerInfos-container">
      <div className="login-form">
        <h1>Mes infos</h1>
        <MDBInput
          className="mb-4"
          type="string"
          name="brand"
          label="Marque"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="model"
          label="Modèle"
          onChange={handleInputRegister}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="plugType"
          label="Type de prise"
          onChange={handleInputRegister}
        />

        <Link to="/login">
          <MDBBtn
            type="button"
            onClick={handleSubmitRegister}
            className="mb-4"
            block
          >
            Terminer l'inscription
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
