// import { Navigate, Outlet } from "react-router-dom";
// import type { ReactNode } from "react";

// interface ProtectedRouteProps {
//   children?: ReactNode;
// }

// export default function ProtectedRoute({ children }: ProtectedRouteProps) {
//   let token: string | undefined;

//   try {
//     const userData = localStorage.getItem("user");
//     const parsedUser = userData ? JSON.parse(userData) : null;
//     token = parsedUser?.access_token || parsedUser?.user?.access_token;
//   } catch (error) {
//     console.error("Failed to parse user data:", error);
//   }

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children ?? <Outlet />}</>;
// }
// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children ?? <Outlet />}</>;
}
