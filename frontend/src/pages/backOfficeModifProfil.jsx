import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

export default function BackOfficeModifProfi() {
  const [backOfficemodifProfil, setBackOfficeModifProfil] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setBackOfficeModifProfil({
      ...backOfficemodifProfil,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modifprofil_container">
      <div className="titlemodifprofil">
        <h1>Modification Profil Utilisateur</h1>
      </div>
      <form>
        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example2"
          label="email"
          onChange={handleChange}
        />
        <span className="material-symbols-outlined">edit</span>
        <span className="material-symbols-outlined">delete</span>
        <MDBInput
          className="mb-4"
          type="firstname"
          id="form1Example2"
          label="Prénom"
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="lastname"
          id="form1Example2"
          label="Nom"
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="birthday"
          id="form1Example2"
          label="Date de naissance"
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="codepostal"
          id="form1Example2"
          label="Code Postal"
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="city"
          id="form1Example2"
          label="Ville"
          onChange={handleChange}
        />

        <MDBBtn onClick={onSubmit} type="submit" block>
          Enregistrer
        </MDBBtn>
      </form>
    </div>
  );
}
