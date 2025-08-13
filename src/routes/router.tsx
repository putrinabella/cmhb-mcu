import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import ResponsiveLayout from "@/layout/ResponsiveLayout";

import WelcomePage from "@/pages/WelcomePage";
import LoginPage from "@/pages/LoginPage";
import LoginEmployeePage from "@/pages/LoginEmployeePage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import NotFoundPage from "@/pages/error/NotFoundPage";
import EmployeeRegisterPage from "@/pages/EmployeeRegisterPage";
import ProfilePage from "@/pages/ProfilePage";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { path: "/", element: <WelcomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/login-employee", element: <LoginEmployeePage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: <DashboardPage /> }],
      },
      {
        path: "/registrasi-karyawan",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: <EmployeeRegisterPage /> }],
      },
      {
        path: "/hasil-mcu",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: <DashboardPage /> }],
      },
      {
        path: "/profile",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: <ProfilePage /> }],
      },
      {
        path: "/404",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: <NotFoundPage /> }],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
