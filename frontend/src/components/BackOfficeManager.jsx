import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

export default function BackOfficeManager() {
  const isAdmin = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
}
