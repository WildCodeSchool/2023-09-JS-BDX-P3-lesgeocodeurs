import { useState, useEffect } from "react";
import axios from "axios";
import { MDBDatatable } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBarBackOffice from "../components/NavBarBackOffice";
import { useTheContext } from "../context/Context";

export default function BackOfficeUtilisateur() {
  const [userData, setUserData] = useState([]);
  const { deleteUser } = useTheContext();
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3310/api/users`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/backofficemodifprofil/${userId}`); // Utilisation de navigate pour la redirection
  };

  const columns = [
    "id",
    "email",
    "first_name",
    "last_name",
    "birth_date",
    "postal_code",
    "city",
    "modification",
  ];
  const rows = userData.map((user) => [
    user.id,
    user.email,
    user.first_name,
    user.last_name,
    user.birth_date,
    user.postal_code,
    user.city,
    <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(user.id)} />,
    <FontAwesomeIcon icon={faTrash} onClick={() => deleteUser(user.id)} />,
  ]);

  const basicData = { columns, rows };
  return (
    <div className="backofficeutilisateur_container">
      <h1>BackOffice Utilisateur</h1>
      <NavBarBackOffice />

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
    </div>
  );
}
