import { useState, useEffect } from "react";
import axios from "axios";
import { MDBDatatable } from "mdb-react-ui-kit";
import NavBarBackOffice from "../components/NavBarBackOffice";

export default function BackOfficeUtilisateur() {
  const [userData, setUserData] = useState([]);

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

  const columns = [
    "id",
    "email",
    "first_name",
    "last_name",
    "birth_date",
    "postal_code",
    "city",
  ];
  const rows = userData.map((user) => [
    user.id,
    user.email,
    user.first_name,
    user.last_name,
    user.birth_date,
    user.postal_code,
    user.city,
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
