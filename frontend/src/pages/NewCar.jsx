import { MDBInput, MDBBtn, MDBSelect } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheContext } from "../context/Context";

export default function NewCar() {
  const [plugTypes, setPlugTypes] = useState([]);
  const { createNewCar } = useTheContext();
  const [vFormData, setvFormData] = useState({
    brand: "",
    model: "",
    plug_type_id: 2,
  });

  const handleChange = (e) =>
    setvFormData({
      ...vFormData,
      [e.target.name]: e.target.value,
    });
  // le composant select de mdbootstrap fonctionne différement des autres ("e.value" au lieu de "e.target.value")
  const handleSelect = (e) =>
    setvFormData({
      ...vFormData,
      plug_type_id: e.value,
    });

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
        <h1>Ajouter un véhicule</h1>
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
          name="plug_type_id"
          label="Type de prise"
          className="select-btn"
          value={vFormData.plug_type_id}
          data={options.map((plugType) => ({
            text: plugType.name, // Assurez-vous que la propriété name correspond à la propriété correcte du type de prise
            value: plugType.id,
          }))}
          onValueChange={handleSelect}
        />
        <Link to="/newcar">
          <MDBBtn
            type="submit"
            className="mb-4"
            block
            onClick={() => createNewCar(vFormData)}
          >
            Enregistrer le nouveau véhicule
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
