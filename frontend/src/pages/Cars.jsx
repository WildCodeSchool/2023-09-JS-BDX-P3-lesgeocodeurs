import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cars() {
  function rtn() {
    window.history.back();
  }
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3310/api/vehicle/users/1`
        );
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCar = async (carId) => {
    try {
      // Appeler l'API Backend pour supprimer le véhicule
      await axios.delete(`http://localhost:3310/api/vehicules/${carId}`);

      // Mettre à jour l'état local ou recharger la liste de véhicules après la suppression
      // ...
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

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
                  <MDBCardText>Type de prise : {car.plug_type_id}</MDBCardText>
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
      <Link to="/register/cars">
        <div className="add-car">
          <MDBBtn type="submit" className="mb-4" block>
            Ajouter un véhicule
          </MDBBtn>
        </div>
      </Link>
    </div>
  );
}
