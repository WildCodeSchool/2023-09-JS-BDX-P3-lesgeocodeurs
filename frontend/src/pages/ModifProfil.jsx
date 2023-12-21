import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { useTheContext } from "../context/Context";

export default function ModifProfil() {
  const { getRegisterStorage } = useTheContext();
  const [modifProfil, setModifProfil] = useState(getRegisterStorage);
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
          name="email"
          value={modifProfil?.email}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="firstname"
          id="form1Example2"
          label="Prénom"
          name="firstName"
          value={modifProfil?.firstName}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="lastname"
          id="form1Example2"
          label="Nom"
          name="name"
          value={modifProfil?.name}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="birthday"
          id="form1Example2"
          label="Date de naissance"
          name="birthDate"
          value={modifProfil?.birthDate}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="codepostal"
          id="form1Example2"
          label="Code Postal"
          name="Postal"
          value={modifProfil?.Postal}
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
