import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

export default function ModifProfil() {
  const [modifProfil, setModifProfil] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
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
          type="email"
          id="form1Example2"
          label="email"
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="fiestname"
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
