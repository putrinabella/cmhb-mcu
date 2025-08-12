import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function GuestRoute() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
