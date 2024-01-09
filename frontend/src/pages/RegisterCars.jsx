import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
// import { useTheContext } from "../context/Context";

export default function RegisterCars() {
  const [vFormData, setvFormData] = useState({
    brand: "",
    model: "",
    plug_type_id: "",
  });

  const handleChange = (e) =>
    setvFormData({ ...vFormData, [e.target.name]: e.target.value });

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
        <MDBInput
          className="mb-4"
          type="string"
          name="plug_type_id"
          label="Type de prise"
          value={vFormData.plug_type_id}
          onChange={handleChange}
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
