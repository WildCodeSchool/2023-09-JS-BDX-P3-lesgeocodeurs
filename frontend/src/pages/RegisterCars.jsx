import { MDBInput, MDBBtn, MDBSelect } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterCars() {
  const [plugTypes, setPlugTypes] = useState([]);

  const [vFormData, setvFormData] = useState({
    brand: "",
    model: "",
    plugTypes: "",
  });

  const handleChange = (e) =>
    setvFormData({ ...vFormData, [e.target.name]: e.target.value });

  useEffect(() => {
    const fetchPlugTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/plugtypes");
        setPlugTypes(response.data);
      } catch (error) {
        console.error("Error fetching plug types:", error);
      }
    };

    fetchPlugTypes();
  }, []);
  const options = plugTypes;
  return (
    <div className="registerInfos-container">
      <div className="login-form">
        <h1>Mes infos</h1>
        <MDBInput
          className="mb-4"
          type="string"
          name="brand"
          label="Marque"
          value={vFormData.brand}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="model"
          label="Modèle"
          value={vFormData.model}
          onChange={handleChange}
        />

        <MDBSelect
          name="plugType"
          label="Type de prise"
          className="select-btn"
          data={options.map((plugType) => ({
            text: plugType.name, // Assurez-vous que la propriété name correspond à la propriété correcte du type de prise
            value: plugType.id,
          }))}
        />

        <MDBBtn
          type="button"
          // onClick={() => register(vFormData)}
          className="mb-4"
          block
        >
          Terminer l'inscription
        </MDBBtn>
      </div>
    </div>
  );
}
