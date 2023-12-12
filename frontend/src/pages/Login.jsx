import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Login() {
  const [logUser, setLogUser] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // getUser();
  };
  const handleInput = (e) => {
    setLogUser({ ...logUser, [e.target.name]: e.target.value });
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <MDBInput
        className="mb-4"
        type="email"
        name="email"
        id="form2Example1"
        label="Email address"
        onChange={handleInput}
      />
      <MDBInput
        className="mb-4"
        type="password"
        name="password"
        id="form2Example2"
        label="Password"
        onChange={handleInput}
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox id="form2Example3" label="Remember me" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Forgot password?</a>
        </MDBCol>
      </MDBRow>
      <MDBBtn type="submit" className="mb-4" color="$my-theme-primary" block>
        Sign in
      </MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <Link href="/register">Register</Link>
        </p>
      </div>
    </form>
  );
}
