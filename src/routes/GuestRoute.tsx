// import { Navigate, Outlet } from "react-router-dom";

// export default function GuestRoute() {
//   let token: string | undefined;

//   try {
//     const userData = localStorage.getItem("user");
//     const parsedUser = userData ? JSON.parse(userData) : null;
//     token = parsedUser?.access_token || parsedUser?.user?.access_token;
//   } catch (error) {
//     console.error("Failed to parse user data:", error);
//   }

//   // Kalau sudah login → langsung ke dashboard
//   if (token) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // Kalau belum login → biarkan akses halaman guest
//   return <Outlet />;
// }
// GuestRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function GuestRoute() {
  const { token } = useAuth();

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
