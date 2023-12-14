import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterCars() {
  const { handleInputRegister, setUserConected } = useTheContext();

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    setUserConected(true);
    // postUser();
  };
  return (
    <div className="registerInfos-container">
      <form className="login-form" onSubmit={handleSubmitRegister}>
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

        <Link to="/">
          <MDBBtn type="submit" className="mb-4" block>
            Terminer l'inscription
          </MDBBtn>
        </Link>
      </form>
    </div>
  );
}
