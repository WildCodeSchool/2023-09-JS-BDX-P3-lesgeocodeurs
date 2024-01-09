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
    first_name: "",
    last_name: "",
    birth_date: "",
    postal_code: "",
    city: "",
  });
  return (
    <div>
      {user ? <MyAccount /> : <Outlet context={{ formData, setFormData }} />}
    </div>
  );
}
