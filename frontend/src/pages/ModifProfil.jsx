import { useNavigate } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setModifProfil({
      ...modifProfil,
      birth_date: modifProfil?.birth_date.substring(0, 10),
    });
  }, []);

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
          type="string"
          id="form1Example2"
          label="Prénom"
          name="first_name"
          value={modifProfil?.first_name}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="last_name"
          id="form1Example2"
          label="Nom"
          name="last_name"
          value={modifProfil?.last_name}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="date"
          id="form1Example2"
          label="Date de naissance"
          name="birth_date"
          value={modifProfil?.birth_date.substring(0, 10)}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="codepostal"
          id="form1Example2"
          label="Code Postal"
          name="postal_code"
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
