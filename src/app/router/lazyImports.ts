import { lazy } from "react";

export const LoginPage = lazy(() => import("@/pages/auth/login/LoginPage"));
export const UsersPage = lazy(() => import("@/pages/users/UsersPage"));
export const CartridgeModelPage = lazy(
  () => import("@/pages/cartridge/CartridgeModelPage")
);
export const WarehousePage = lazy(
  () => import("@/pages/warehouse/WarehousePage")
);
export const DivisionPage = lazy(() => import("@/pages/division/DivisionPage"));
export const ProfilePage = lazy(() => import("@/pages/profile/ProfilePage"));
export const ReportsPage = lazy(() => import("@/pages/reports/ReportsPage"));
export const DashboardPage = lazy(
  () => import("@/pages/dashboards/DashboardPage")
);
