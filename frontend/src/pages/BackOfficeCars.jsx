import { MDBDatatable } from "mdb-react-ui-kit";
import NavBarBackOffice from "../components/NavBarBackOffice";

export default function BackOfficeCars() {
  const basicData = {
    columns: ["Id", "type de prise", "brand", "model"],
    rows: [
      ["Tiger Nixon", "System Architect", "Edinburgh", "61"],
      ["Garrett Winters", "Accountant", "Tokyo", "63"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "66"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22"],
      ["Airi Satou", "Accountant", "Tokyo", "33"],
      ["Brielle Williamson", "Integration Specialist", "New York", "61"],
      ["Herrod Chandler", "Sales Assistant", "San Francisco", "59"],
      ["Rhona Davidson", "Integration Specialist", "Tokyo", "55"],
      ["Colleen Hurst", "Javascript Developer", "San Francisco", "39"],
      ["Sonya Frost", "Software Engineer", "Edinburgh", "23"],
      ["Jena Gaines", "Office Manager", "London", "30"],
      ["Quinn Flynn", "Support Lead", "Edinburgh", "22"],
      ["Charde Marshall", "Regional Director", "San Francisco", "36"],
      ["Haley Kennedy", "Senior Marketing Designer", "London", "43"],
    ],
  };
  return (
    <div className="backofficeutilisateur_container">
      <h1>BackOffice Véhicules</h1>
      <NavBarBackOffice />

      <div className="backoffidata">
        <MDBDatatable fixedHeader maxHeight="460px" data={basicData} />
      </div>
    </div>
  );
}
