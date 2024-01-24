import { useState, useEffect } from "react";
import { MDBDatatable } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import NavBarBackOffice from "../components/NavBarBackOffice";
import { useTheContext } from "../context/Context";
import apiService from "../services/api.service";

export default function BackOfficeUtilisateur() {
  const [userData, setUserData] = useState([]);
  const { deleteUserAdmin } = useTheContext();
  const navigate = useNavigate();
  // Utilisation de useNavigate pour la navigation
  const fetchData = async () => {
    try {
      const response = await apiService.get(`http://localhost:3310/api/users`);
      setUserData(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/backofficemodifprofil/${userId}`); // Utilisation de navigate pour la redirection
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUserAdmin(userId);
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppresion de l'utilisateur :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
  const rows =
    userData?.map((user) => [
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.birth_date,
      user.postal_code,
      user.city,
      <FontAwesomeIcon icon={faEdit} onClick={() => handleEdit(user.id)} />,
      <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />,
    ]) ?? [];

  const basicData = { columns, rows };

  return (
    <div className="backofficeutilisateur_container">
      <NavBarBackOffice />

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
    </div>
  );
}
