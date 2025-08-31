import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../ErrorBoundary";
import { Suspense } from "react";
import {
  AppLayout,
  CartridgeModelLayout,
  DivisionLayout,
  LoginLayout,
  ProfileLayout,
  ReportsLayout,
  // StaffLayout,
  UsersLayout,
  WarehouseLayout,
} from "../lazyImports";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import PublicRoute from "./loaders/Public";
import LoginSkeleton from "../pages/auth/LoginSkeleton";
import PrivateRoute from "./loaders/Private";
import AdminRoute from "./loaders/AdminRoute";
import { UsersTable } from "../pages/users/UsersTable";
import { UserCard } from "../pages/users/UserCardTable/UserCard";
import UserAndAdminRoute from "./loaders/UserAndAdminRoute";
// import { StaffTable } from "../pages/staff/StaffTable";
// import { StaffCard } from "../pages/staff/StaffCardTable/StaffCard";

// SpinnerLoad можно будет заменить на Skeleton различный в дальнейшем

export const router = createBrowserRouter([
  {
    path: "auth",
    loader: PublicRoute,
    element: (
      <Suspense key="auth" fallback={<LoginSkeleton />}>
        <LoginLayout />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    path: "/",
    loader: PrivateRoute,
    element: (
      <Suspense key="app" fallback={<SpinnerLoad />}>
        <AppLayout />
      </Suspense>
    ),

    children: [
      {
        loader: UserAndAdminRoute,
        path: "warehouse/:id",

        // TODO список складов + операции
        element: (
          <Suspense key="warehouse" fallback={<SpinnerLoad />}>
            <WarehouseLayout />
          </Suspense>
        ),
      },
      {
        loader: UserAndAdminRoute,
        path: "division/:id",

        // TODO список подразделений + операции

        element: (
          <Suspense key="division" fallback={<SpinnerLoad />}>
            <DivisionLayout />
          </Suspense>
        ),
      },
      {
        children: [
          {
            loader: UserAndAdminRoute,
            path: "users",

            // TODO список пользователей + операции

            element: (
              <Suspense key="users" fallback={<SpinnerLoad />}>
                <UsersLayout />
              </Suspense>
            ),
            children: [
              {
                index: true,
                element: <UsersTable />,
              },
              {
                path: ":id",
                element: <UserCard />,
              },
            ],
          },
          {
            loader: AdminRoute,
            path: "cartrideModel",

            // TODO список моделей картриджей + операции

            element: (
              <Suspense key="cartrideModel" fallback={<SpinnerLoad />}>
                <CartridgeModelLayout />
              </Suspense>
            ),
          },
        ],
        errorElement: <ErrorBoundary />,
      },
      {
        path: "profile",
        // TODO Компонент профиля

        element: (
          <Suspense key="profile" fallback={<SpinnerLoad />}>
            <ProfileLayout />
          </Suspense>
        ),
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны

        element: (
          <Suspense key="reports" fallback={<SpinnerLoad />}>
            <ReportsLayout />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
