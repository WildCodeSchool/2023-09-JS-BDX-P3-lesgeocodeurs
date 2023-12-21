import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterInfos() {
  const { handleInputRegister, userRegister, calculerAge } = useTheContext();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formErrors = [];
  const age = userRegister.birthDate ? calculerAge(userRegister.birthDate) : 0;

  if (
    userRegister.name?.length < 3 ||
    userRegister.name?.length > 15 ||
    userRegister.name === null ||
    /^[a-zA-Z\s-]{1,}$/.test(userRegister.name) === false
  ) {
    formErrors.push("Veuillez renseigner un nom valide");
  }
  if (
    userRegister.firstName?.length < 3 ||
    userRegister.firstName?.length > 15 ||
    userRegister.firstName === null ||
    /^[a-zA-Z\s-]{1,}$/.test(userRegister.firstName) === false
  ) {
    formErrors.push("Veuillez renseigner un prénom valide");
  }
  if (age < 18) {
    formErrors.push("Vous devez avoir plus de 18ans pour vous incrire");
  }
  if (age > 100) {
    formErrors.push("Vous ne devriez pas conduire à cet âge...");
  }
  if (
    userRegister.city?.length < 3 &&
    /^[a-zA-Z\s-]{1,}$/.test(userRegister.city)
  ) {
    formErrors.push("Veuillez renseigner une ville valide");
  }
  return (
    <div className="register-container">
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
          type="string"
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

        <Link to="/register/cars" disabled={formErrors.length !== 0}>
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
