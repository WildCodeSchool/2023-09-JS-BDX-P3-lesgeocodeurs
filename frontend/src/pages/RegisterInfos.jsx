import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { Link, useOutletContext } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterInfos() {
  const { calculerAge, register } = useTheContext();

  const { formData, setFormData } = useOutletContext();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const formErrors = [];
  const age = formData.birth_date ? calculerAge(formData.birth_date) : 0;

  if (
    formData?.last_name?.length < 3 ||
    formData?.last_name?.length > 15 ||
    /^[a-zA-Z\s-]{1,}$/.test(formData.last_name) === false
  ) {
    formErrors.push("Veuillez renseigner un nom valide");
  }
  if (
    formData.first_name?.length < 3 ||
    formData.first_name?.length > 15 ||
    formData.first_name === null ||
    /^[a-zA-Z\s-]{1,}$/.test(formData.first_name) === false
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
          name="first_name"
          label="Prenom"
          value={formData.first_name}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="last_name"
          label="Nom"
          value={formData.last_name}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="date"
          name="birth_date"
          label="Date de naissance"
          value={formData.birth_date}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          required
          name="postal_code"
          label="Code postal"
          value={formData.postal_code}
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
            onClick={() => register(formData)}
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
