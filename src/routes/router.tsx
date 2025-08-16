import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import ResponsiveLayout from "@/layout/ResponsiveLayout";

// Lazy load halaman
const WelcomePage = lazy(() => import("@/pages/WelcomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const LoginEmployeePage = lazy(() => import("@/pages/LoginEmployeePage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const EmployeeRegisterPage = lazy(() => import("@/pages/EmployeeRegisterPage"));
const ProfileMobilePage = lazy(() => import("@/pages/ProfileMobilePage"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));
const CompaniesPage = lazy(() => import("@/pages/CompaniesPage"));
const ProfileLayout = lazy(() => import("@/layout/ProfileLayout"));

// Helper untuk membungkus lazy component dengan Suspense
const Loadable = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      { path: "/", element: Loadable(WelcomePage) },
      { path: "/login", element: Loadable(LoginPage) },
      { path: "/login-employee", element: Loadable(LoginEmployeePage) },
      { path: "/register", element: Loadable(RegisterPage) },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/company-profile",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(CompaniesPage) }],
      },
      {
        path: "/dashboard",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(DashboardPage) }],
      },
      {
        path: "/registrasi-karyawan",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(EmployeeRegisterPage) }],
      },
      {
        path: "/hasil-mcu",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(DashboardPage) }],
      },
      {
        path: "/profile",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(ProfileLayout) }],
      },
      {
        path: "/404",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(NotFoundPage) }],
      },
    ],
  },
  { path: "*", element: Loadable(NotFoundPage) },
]);

export default router;
