import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useOutletContext } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterInfos() {
  const { calculerAge } = useTheContext();

  const { formData, setFormData } = useOutletContext();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formErrors = [];
  const age = formData.birthDate ? calculerAge(formData.birthDate) : 0;

  if (
    formData?.name?.length < 3 ||
    formData?.name?.length > 15 ||
    /^[a-zA-Z\s-]{1,}$/.test(formData.name) === false
  ) {
    formErrors.push("Veuillez renseigner un nom valide");
  }
  if (
    formData.firstName?.length < 3 ||
    formData.firstName?.length > 15 ||
    formData.firstName === null ||
    /^[a-zA-Z\s-]{1,}$/.test(formData.firstName) === false
  ) {
    formErrors.push("Veuillez renseigner un prénom valide");
  }
  if (age < 18) {
    formErrors.push("Vous devez avoir plus de 18ans pour vous incrire");
  }
  if (age > 100) {
    formErrors.push("Vous ne devriez pas conduire à cet âge...");
  }
  if (formData.city?.length < 3 && /^[a-zA-Z\s-]{1,}$/.test(formData.city)) {
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
          value={formData.firstName}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="name"
          label="Nom"
          value={formData.name}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="date"
          name="birthDate"
          label="Date de naissance"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          required
          name="Postal"
          label="Code postal"
          value={formData.Postal}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="city"
          name="city"
          label="Ville"
          value={formData.city}
          onChange={handleChange}
        />

        <Link to="/register/cars" disabled={formErrors.length !== 0}>
          <MDBBtn
            type="submit"
            className="mb-4"
            block
            /* disabled={formErrors.length !== 0} */
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
