import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useOutletContext } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function Register() {
  const { formData, setFormData } = useOutletContext();
  const { emailAvailable } = useTheContext();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailAvailable(formData.email);
    // postUser();
  };
  const formErrors = [];

  if (formData.password !== formData.confirmPassword) {
    formErrors.push("Les mots de passe ne correspondent pas");
  }
  /*   if (formData.email && !isValidEmail) {
    formErrors.push("L'adresse email n'est pas valide");
  } */
  if (formData.password && formData.password.length < 8) {
    formErrors.push("Le mot de passe doit contenir au moins 8 caractères");
  }
  if (!/\d/.test(formData.password)) {
    formErrors.push(
      "le champ  de mot de passe doit contenir au moins un chiffre"
    );
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
    formErrors.push("Le mot de passe doit contenir au moins une ponctuation");
  }
  if (formData?.password?.trim() === "") {
    formErrors.push("Le champ du mot de passe ne peut pas être vide");
  }

  return (
    <div className="register-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <MDBInput
          className="mb-4"
          type="email"
          required
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
        <MDBInput
          className="mb-4"
          type="password"
          name="confirmPassword"
          label="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <MDBBtn
          type="submit"
          className="mb-4"
          block
          /* disabled={formErrors.length !== 0} */
        >
          Suivant
        </MDBBtn>
        {formErrors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </form>
    </div>
  );
}
