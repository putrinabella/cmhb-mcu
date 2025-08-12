import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import ResponsiveLayout from "@/layout/ResponsiveLayout";

import WelcomePage from "@/pages/WelcomePage";
import LoginPage from "@/pages/LoginPage";
import LoginEmployeePage from "@/pages/LoginEmployeePage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
// import NotFoundPage from "@/pages/error/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    // errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <WelcomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/login-employee", element: <LoginEmployeePage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    // errorElement: <NotFoundPage />,
    children: [
      {
        path: "/dashboard",
        element: <ResponsiveLayout />,
        children: [{ path: "", element: <DashboardPage /> }],
      },
    ],
  },
]);

export default router;
