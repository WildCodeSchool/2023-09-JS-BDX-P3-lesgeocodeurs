import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useTheContext } from "../context/Context";

export default function BackOfficeModifProfil() {
  const { apiService } = useTheContext();
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const [modifProfil, setModifProfil] = useState({
    email: loaderData?.preloadedUserData?.email ?? "",
    first_name: loaderData?.preloadedUserData?.first_name ?? "",
    last_name: loaderData?.preloadedUserData?.last_name ?? "",
    birth_date: loaderData?.preloadedUserData?.birth_date ?? "",
    postal_code: loaderData?.preloadedUserData?.postal_code ?? "",
    city: loaderData?.preloadedUserData?.city ?? "",
  });

  const { userId } = useParams();

  const editNewProfil = async (newData) => {
    try {
      const response = await apiService.put(`/users/${userId}`, newData);
      console.info(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await editNewProfil(modifProfil);
    navigate("/backoffice/utilisateur");
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
          name="email"
          value={modifProfil?.email}
          onChange={handleChange}
        />
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
