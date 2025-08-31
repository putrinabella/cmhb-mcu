import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { LoadingIndicator } from "@/components/LoadingIndicator";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, loading, user } = useAuth();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const currentPath = window.location.pathname;
  // Proteksi registrasi karyawan
  if (currentPath.startsWith("/registrasi-karyawan") && user?.role !== "PIC") {
    return <Navigate to="/dashboard" replace />;
  }

  // Proteksi company profile
  if (currentPath.startsWith("/company-profile") && user?.role !== "PIC") {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}

// import { Navigate, Outlet } from "react-router-dom";
// import type { ReactNode } from "react";
// import { useAuth } from "./AuthContext";
// import { LoadingIndicator } from "@/components/LoadingIndicator";

// interface ProtectedRouteProps {
//   children?: ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   const { token, loading } = useAuth();

//   if (loading) {
//     return <LoadingIndicator />;
//   }

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children ?? <Outlet />}</>;
// }
