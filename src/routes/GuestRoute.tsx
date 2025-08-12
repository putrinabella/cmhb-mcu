// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// export default function GuestRoute() {
//   const { token } = useAuth();

//   if (token) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return <Outlet />;
// }

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function GuestRoute() {
  const { token, loading } = useAuth();

  if (loading) {
    return null; // atau spinner loading
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
