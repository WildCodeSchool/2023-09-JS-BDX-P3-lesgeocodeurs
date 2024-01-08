import { MDBInput, MDBBtn, MDBSelect } from "mdb-react-ui-kit";
import { useOutletContext } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterCars() {
  const { register } = useTheContext();

  const { formData, setFormData } = useOutletContext();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="registerInfos-container">
      <div className="login-form">
        <h1>Mes infos</h1>
        <MDBInput
          className="mb-4"
          type="string"
          name="brand"
          label="Marque"
          value={formData.brand}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="model"
          label="Modèle"
          value={formData.model}
          onChange={handleChange}
        />
        <MDBInput
          className="mb-4"
          type="string"
          name="plugType"
          label="Type de prise"
          value={formData.plug_type_id}
          onChange={handleChange}
        />
        <MDBSelect
          name="plugType"
          label="Type de prise"
          className="select-btn"
          data={[
            { text: "EF", value: 1 },
            { text: "Type 2", value: 2 },
            { text: "Combo CCS", value: 3 },
            { text: "Chademo", value: 4 },
            { text: "Autre", value: 5 },
            { text: "Six", value: 6 },
          ]}
        />

        <MDBBtn
          type="button"
          onClick={() => register(formData)}
          className="mb-4"
          block
        >
          Terminer l'inscription
        </MDBBtn>
      </div>
    </div>
  );
}
