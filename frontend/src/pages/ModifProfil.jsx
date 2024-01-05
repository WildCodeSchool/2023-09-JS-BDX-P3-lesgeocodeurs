import { useNavigate } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { useTheContext } from "../context/Context";

export default function ModifProfil() {
  const navigate = useNavigate();
  const { user, editUser } = useTheContext();
  const [modifProfil, setModifProfil] = useState(user);

  const onSubmit = (e) => {
    e.preventDefault();
    editUser(modifProfil);
    navigate("/myaccount");
  };

  const handleChange = (e) => {
    setModifProfil({ ...modifProfil, [e.target.name]: e.target.value });
  };

  return (
    <div className="modifprofil_container">
      <div className="titlemodifprofil">
        <h1>Modifier mon Profil</h1>
      </div>
      <form>
        <MDBInput
          className="mb-4"
          type="firstname"
          id="form1Example2"
          label="Prénom"
          name="firstName"
          value={modifProfil?.first_name}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="lastname"
          id="form1Example2"
          label="Nom"
          name="lastName"
          value={modifProfil?.last_ame}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="date"
          id="form1Example2"
          label="Date de naissance"
          name="birthDate"
          value={modifProfil?.birth_date}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="codepostal"
          id="form1Example2"
          label="Code Postal"
          name="postalCode"
          value={modifProfil?.postal_code}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="city"
          id="form1Example2"
          label="Ville"
          name="city"
          value={modifProfil?.city}
          onChange={handleChange}
        />
        <MDBBtn onClick={onSubmit} type="submit" block>
          Enregistrer
        </MDBBtn>
      </form>
    </div>
  );
}
