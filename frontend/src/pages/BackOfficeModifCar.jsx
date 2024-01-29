import { MDBInput, MDBBtn, MDBSelect } from "mdb-react-ui-kit";
import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function BackOfficeModifCar() {
  const [plugTypes, setPlugTypes] = useState([]);
  const navigate = useNavigate();
  const { apiService } = useTheContext();
  const { carId } = useParams();
  const loaderData = useLoaderData();

  const [vFormData, setvFormData] = useState({
    brand: loaderData?.preloadedCarData?.brand ?? "",
    model: loaderData?.preloadedCarData?.model ?? "",
    plug_type_id: loaderData?.preloadedCarData?.plug_type_id ?? "",
  });

  const editCar = async (newData) => {
    try {
      const response = await apiService.put(`/vehicle/${carId}`, newData);
      console.info(response);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await editCar(vFormData);
    navigate("/backoffice/cars");
  };
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
        const response = await apiService.get(`/plugtypes`);
        setPlugTypes(response);
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
        <h1>Modidfier un véhicule</h1>
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

        <MDBBtn type="submit" className="mb-4" block onClick={onSubmit}>
          Enregistrer le nouveau véhicule
        </MDBBtn>
      </div>
    </div>
  );
}
