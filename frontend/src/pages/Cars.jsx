import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cars() {
  function rtn() {
    window.history.back();
  }
  const [plugTypes, setPlugTypes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPlugTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3310/api/plugTypes");
        setPlugTypes(response.data);
      } catch (error) {
        console.error("Error fetching plug types:", error);
      }
    };

    fetchPlugTypes();
  }, []);
  function getPlugTypeName(plugTypeId) {
    const plugType = plugTypes.find((type) => type.id === plugTypeId);
    return plugType ? plugType.name : "Type inconnu";
  }
  const handleDeleteCar = async (carId) => {
    try {
      // Appeler l'API Backend pour supprimer le véhicule
      await axios.delete(`http://localhost:3310/api/vehicle/${carId}`);
      navigate("/cars");
      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression
      // ...
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem("token");
      const token = jwtDecode(jwtToken);
      try {
        const response = await axios.get(
          `http://localhost:3310/api/vehicle/users/${token.id}`
        );
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, [handleDeleteCar]);

  return (
    <div className="cars-container">
      <button type="submit" className="back" onClick={rtn}>
        &larr; Retour
      </button>
      <h1 className="cars-title">Mes véhicules</h1>
      <div className="my-car">
        <MDBCard border>
          {vehicles.map((car) => (
            <div className="one-car" key={car.model}>
              <MDBCardBody>
                <div>
                  <MDBCardTitle>
                    {car.brand} {car.model}
                  </MDBCardTitle>
                  <MDBCardText>
                    Type de prise : {getPlugTypeName(car.plug_type_id)}
                  </MDBCardText>
                </div>
                <div className="btn-delete-car">
                  <MDBBtn size="sm" onClick={() => handleDeleteCar(car.id)}>
                    Supprimer
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </div>
          ))}
        </MDBCard>
      </div>
      <div className="add-car">
        <Link to="/newcar">
          <MDBBtn type="submit" className="mb-4" block>
            Ajouter un véhicule
          </MDBBtn>
        </Link>
      </div>
    </div>
  );
}
