import { Outlet } from "react-router-dom";
import { useTheContext } from "../context/Context";
import MyAccount from "../pages/MyAccount";

export default function RegisterManager() {
  const { userConected } = useTheContext();
  return <div>{userConected ? <MyAccount /> : <Outlet />}</div>;
}
