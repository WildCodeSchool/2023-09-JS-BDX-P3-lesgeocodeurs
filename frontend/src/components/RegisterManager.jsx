import { Navigate, Outlet } from "react-router-dom";
import { useTheContext } from "../context/Context";

export default function RegisterManager() {
  const { userConected } = useTheContext();
  return <div>{!userConected ? <Outlet /> : <Navigate to="/account" />}</div>;
}
