import { useAuth } from "hooks";
import { Navigate, Outlet } from "react-router-dom";

export const UnauthenticatedRoutes = () => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to={"/app/Inbox"} /> : <Outlet />;
};
