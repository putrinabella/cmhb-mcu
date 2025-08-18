import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { LoadingIndicator } from "@/components/LoadingIndicator";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingIndicator />; // Bisa ganti dengan spinner loading kalau mau
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
