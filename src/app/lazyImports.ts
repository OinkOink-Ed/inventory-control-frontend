import { lazy } from "react";

export const LoginLayout = lazy(() => import("./Layouts/LoginLayout"));
export const AppLayout = lazy(() => import("./Layouts/AppLayout"));
export const UsersLayout = lazy(() => import("./Layouts/UsersLayout"));
export const CartridgeModelLayout = lazy(
  () => import("./Layouts/CartridgeModelLayout"),
);
export const KabinetLayout = lazy(() => import("./Layouts/KabinetLayout"));
export const WarehouseLayout = lazy(() => import("./Layouts/WarehouseLayout"));
export const DivisionLayout = lazy(() => import("./Layouts/DivisionLayout"));
export const ProfileLayout = lazy(() => import("./Layouts/ProfileLayout"));
export const ReportsLayout = lazy(() => import("./Layouts/ReportsLayout"));
export const DeliveryLayout = lazy(() => import("./Layouts/DeliveryLayout"));
