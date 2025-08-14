// import { createBrowserRouter } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import GuestRoute from "./GuestRoute";

// import ResponsiveLayout from "@/layout/ResponsiveLayout";

// import WelcomePage from "@/pages/WelcomePage";
// import LoginPage from "@/pages/LoginPage";
// import LoginEmployeePage from "@/pages/LoginEmployeePage";
// import RegisterPage from "@/pages/RegisterPage";
// import DashboardPage from "@/pages/DashboardPage";
// import NotFoundPage from "@/pages/error/NotFoundPage";
// import EmployeeRegisterPage from "@/pages/EmployeeRegisterPage";
// import ProfilePage from "@/pages/ProfilePage";

// const router = createBrowserRouter([
//   {
//     element: <GuestRoute />,
//     children: [
//       { path: "/", element: <WelcomePage /> },
//       { path: "/login", element: <LoginPage /> },
//       { path: "/login-employee", element: <LoginEmployeePage /> },
//       { path: "/register", element: <RegisterPage /> },
//     ],
//   },
//   {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/dashboard",
//         element: <ResponsiveLayout />,
//         children: [{ index: true, element: <DashboardPage /> }],
//       },
//       {
//         path: "/registrasi-karyawan",
//         element: <ResponsiveLayout />,
//         children: [{ index: true, element: <EmployeeRegisterPage /> }],
//       },
//       {
//         path: "/hasil-mcu",
//         element: <ResponsiveLayout />,
//         children: [{ index: true, element: <DashboardPage /> }],
//       },
//       {
//         path: "/profile",
//         element: <ResponsiveLayout />,
//         children: [{ index: true, element: <ProfilePage /> }],
//       },
//       {
//         path: "/404",
//         element: <ResponsiveLayout />,
//         children: [{ index: true, element: <NotFoundPage /> }],
//       },
//     ],
//   },
//   { path: "*", element: <NotFoundPage /> },
// ]);

// export default router;
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
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));

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
        children: [{ index: true, element: Loadable(ProfilePage) }],
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
