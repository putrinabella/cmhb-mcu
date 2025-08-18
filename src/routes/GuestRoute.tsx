import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export default function GuestRoute() {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />; // atau spinner loading
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
