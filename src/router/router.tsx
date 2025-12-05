import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../app/ErrorBoundary/ErrorBoundary";
import { Suspense } from "react";
import {
  CartridgeModelPage,
  DashboardPage,
  DivisionPage,
  LoginPage,
  ProfilePage,
  ReportsPage,
  UsersPage,
  WarehousePage,
} from "./lazyImports";
import { UsersTable } from "../pages/users/UsersTable";
import { UserCard } from "../pages/users/UserCard/UserCard";
import { Spinner } from "@/components/ui/spinner";
import { MainLayout } from "@app/layouts";
import { PreRequestWrapperForAccess } from "./components/AccessGuard/PreRequestWrapperForAccess";
import {
  AdminRoute,
  PrivateRoute,
  PublicRoute,
  UserAndAdminRoute,
} from "./guards";

// Spinner можно будет заменить на Skeleton различный в дальнейшем

export const router = createBrowserRouter([
  {
    path: "auth",
    loader: PublicRoute,
    element: <LoginPage />,
  },

  {
    path: "/",
    loader: PrivateRoute,
    element: (
      <Suspense key="app" fallback={<Spinner />}>
        <MainLayout />
      </Suspense>
    ),

    children: [
      {
        loader: UserAndAdminRoute,
        path: "warehouse/:id",
        element: (
          <Suspense key="warehouse" fallback={<Spinner />}>
            <WarehousePage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        loader: UserAndAdminRoute,
        path: "dashboard",

        element: (
          <Suspense key="dashboard" fallback={<Spinner />}>
            <DashboardPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        loader: UserAndAdminRoute,
        path: "division/:id",
        element: (
          <Suspense key="division" fallback={<Spinner />}>
            <DivisionPage />
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
              <Suspense key="users" fallback={<Spinner />}>
                <UsersPage />
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
              <Suspense key="cartrideModel" fallback={<Spinner />}>
                <CartridgeModelPage />
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
          <Suspense key="profile" fallback={<Spinner />}>
            <ProfilePage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны
        element: (
          <Suspense key="reports" fallback={<Spinner />}>
            <ReportsPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
