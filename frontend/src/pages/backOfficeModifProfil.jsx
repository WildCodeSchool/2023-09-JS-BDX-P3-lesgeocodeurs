import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";

export default function BackOfficeModifProfil() {
  const navigate = useNavigate();
  const [modifProfil, setModifProfil] = useState();

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/users/${userId}`
        );
        setModifProfil(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const editNewProfil = async (newData) => {
    try {
      const response = await axios.put(
        `http://localhost:3310/api/users/${userId}`,
        newData
      );
      console.info(response);
      //    getUserInfos();
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editNewProfil(modifProfil);
    navigate("/backofficeutilisateur");
  };

  const handleChange = (e) => {
    setModifProfil({ ...modifProfil, [e.target.name]: e.target.value });
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
          value={modifProfil?.email}
          onChange={handleChange}
        />
        <span className="material-symbols-outlined">edit</span>
        <span className="material-symbols-outlined">delete</span>
        <MDBInput
          className="mb-4"
          type="firstname"
          id="form1Example2"
          label="Prénom"
          value={modifProfil?.first_name}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="lastname"
          id="form1Example2"
          label="Nom"
          value={modifProfil?.last_name}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="birthday"
          id="form1Example2"
          label="Date de naissance"
          value={modifProfil?.birth_date.substring(0, 10)}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="codepostal"
          id="form1Example2"
          label="Code Postal"
          value={modifProfil?.postal_code}
          onChange={handleChange}
        />

        <MDBInput
          className="mb-4"
          type="city"
          id="form1Example2"
          label="Ville"
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
