import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../app/ErrorBoundary";
import { Suspense } from "react";
import {
  AppLayout,
  CartridgeModelLayout,
  DashboardLayout,
  DivisionLayout,
  LoginLayout,
  ProfileLayout,
  ReportsLayout,
  UsersLayout,
  WarehouseLayout,
} from "../app/lazyImports";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import PublicRoute from "./loaders/Public";
import LoginSkeleton from "../pages/auth/LoginSkeleton";
import PrivateRoute from "./loaders/Private";
import AdminRoute from "./loaders/AdminRoute";
import { UsersTable } from "../pages/users/UsersTable";
import UserAndAdminRoute from "./loaders/UserAndAdminRoute";
import { UserCard } from "../pages/users/UserCard/UserCard";
import { PreRequestWrapperForAccess } from "@/components/PreRequestWrapperForAccess/PreRequestWrapperForAccess";

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
        element: (
          <Suspense key="warehouse" fallback={<SpinnerLoad />}>
            <WarehouseLayout />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        loader: UserAndAdminRoute,
        path: "dashboard",

        element: (
          <Suspense key="dashboard" fallback={<SpinnerLoad />}>
            <DashboardLayout />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        loader: UserAndAdminRoute,
        path: "division/:id",
        element: (
          <Suspense key="division" fallback={<SpinnerLoad />}>
            <DivisionLayout />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        children: [
          {
            loader: UserAndAdminRoute,
            path: "users",
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
                element: (
                  <PreRequestWrapperForAccess>
                    <UserCard />
                  </PreRequestWrapperForAccess>
                ),
              },
            ],
          },
          {
            loader: AdminRoute,
            path: "cartrideModel",
            element: (
              <Suspense key="cartrideModel" fallback={<SpinnerLoad />}>
                <CartridgeModelLayout />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
        errorElement: <ErrorBoundary />,
      },
      {
        path: "profile",
        element: (
          <Suspense key="profile" fallback={<SpinnerLoad />}>
            <ProfileLayout />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны
        element: (
          <Suspense key="reports" fallback={<SpinnerLoad />}>
            <ReportsLayout />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
