import { lazy } from "react";

export const LoginLayout = lazy(() => import("./Layouts/LoginLayout"));
export const AppLayout = lazy(() => import("./Layouts/AppLayout"));
export const ManagementLayout = lazy(
  () => import("./Layouts/ManagementLayout"),
);
export const UsersLayout = lazy(() => import("./Layouts/UsersLayout"));
export const SupplementLayout = lazy(
  () => import("./Layouts/SupplementLayout"),
);

export const Delivery = lazy(() => import("./pages/delivery/Delivery"));
export const Warehouse = lazy(() => import("./pages/warehouse/Warehouse"));
export const Profile = lazy(() => import("./pages/profile/Profile"));
export const Reports = lazy(() => import("./pages/reports/Reports"));
