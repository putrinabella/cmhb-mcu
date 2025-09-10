import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import ResponsiveLayout from "@/layout/ResponsiveLayout";
import { LoadingIndicator } from "@/components/LoadingIndicator";
// Lazy load halaman
const WelcomePage = lazy(() => import("@/pages/auth/WelcomePage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const LoginEmployeePage = lazy(() => import("@/pages/auth/LoginEmployeePage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const McuPage = lazy(() => import("@/pages/McuPage"));
const NotFoundPage = lazy(() => import("@/pages/error/NotFoundPage"));
const CompaniesPage = lazy(() => import("@/pages/CompaniesPage"));
const ProfileLayout = lazy(() => import("@/layout/ProfileLayout"));
const CompanyDetailPage = lazy(() => import("@/pages/CompanyDetailPage"));
const BatchPage = lazy(() => import("@/pages/BatchPage"));
const BatchDetailLayout = lazy(() => import("@/layout/BatchDetailLayout"));
const BatchImportPage = lazy(() => import("@/pages/BatchImportPage"));

const ExaminationDetailPage = lazy(
  () => import("@/pages/ExaminationDetailPage")
);

const Loadable = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<LoadingIndicator />}>
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
        children: [
          { index: true, element: Loadable(CompaniesPage) },
          { path: ":id", element: Loadable(CompanyDetailPage) },
        ],
      },
      {
        path: "/dashboard",
        element: <ResponsiveLayout />,
        children: [
          { index: true, element: Loadable(DashboardPage) },
          {
            path: "batch",
            children: [
              { index: true, element: Loadable(BatchPage) },
              { path: ":id", element: Loadable(BatchDetailLayout) },
              { path: ":id/import", element: Loadable(BatchImportPage) },
              {
                path: ":id/examination/:exmId",
                element: Loadable(ExaminationDetailPage),
              },
            ],
          },
        ],
      },
      {
        path: "/hasil-mcu",
        element: <ResponsiveLayout />,
        children: [{ index: true, element: Loadable(McuPage) }],
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
