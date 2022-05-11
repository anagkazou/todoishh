import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "hooks";

export const UnauthenticatedRoutes = () => {
  const { currentUser } = useAuth();
  //const localUser = localStorage.getItem("userAuth");

  return  !currentUser ? <Outlet /> : <Navigate to={"/app/Inbox"} />;
};
