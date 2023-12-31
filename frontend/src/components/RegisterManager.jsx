import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useTheContext } from "../context/Context";
import MyAccount from "../pages/MyAccount";
// import MyAccount from "../pages/MyAccount";

export default function RegisterManager() {
  const { user } = useTheContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    postalCode: "",
    city: "",
    brand: "",
    model: "",
    plugType: "",
  });
  return (
    <div>
      {user ? <MyAccount /> : <Outlet context={{ formData, setFormData }} />}
    </div>
  );
}
