import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

export default function AddCar() {
  return (
    <div className="registerInfos-container">
      <div className="login-form">
        <h1>Ajouter une nouvelle voiture</h1>
        <MDBInput className="mb-4" type="string" name="brand" label="Marque" />
        <MDBInput className="mb-4" type="string" name="model" label="Modèle" />
        <MDBInput
          className="mb-4"
          type="string"
          name="plugType"
          label="Type de prise"
        />

        <MDBBtn type="button" className="mb-4" block>
          Ajouter
        </MDBBtn>
      </div>
    </div>
  );
}
