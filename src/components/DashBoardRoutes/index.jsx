import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "hooks";

export const DashBoardRoutes = () => {
  const { currentUser } = useAuth();
  //  const localUser = localStorage.getItem("userAuth");
  //Todo : Check how this works and use everywhere
  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
};
