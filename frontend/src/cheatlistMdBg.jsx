import { MDBBtn } from "mdb-react-ui-kit";

export default function cheatlist() {
  return (
    <main>
      {/* button md bg */}
      <div>
        <MDBBtn className="me-1" color="success">
          Success
        </MDBBtn>
        <MDBBtn className="me-1" color="danger">
          Danger
        </MDBBtn>
        <MDBBtn className="me-1" color="warning">
          Warning
        </MDBBtn>
        <MDBBtn color="info">Info</MDBBtn>
      </div>
    </main>
  );
}
