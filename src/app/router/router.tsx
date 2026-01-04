import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import { MainLayout } from "@app/layouts";
import { ErrorBoundary } from "@/shared/kit";
import { Spinner } from "@/ui/spinner";
import { UsersTable } from "@features/users";
import { UserCard } from "@/pages/user-card";
import { DashboardPageLazy } from "@/pages/dashboards";
import { LoginPageLazy } from "@/pages/auth";
import { WarehousePageLazy } from "@/pages/warehouse";
import { DivisionPageLazy } from "@/pages/division";
import { UsersPageLzy } from "@/pages/users";
import { CartridgeModelPageLazy } from "@/pages/cartridge";
import { ProfilePageLaze } from "@/pages/profile";
import { ReportsPageLazy } from "@/pages/reports";
import { CanEditGuard } from "@router/wrapper/CanEditGuard.tsx";
import { PublicRoute } from "@router/RouteGuard/Public.tsx";
import { PrivateRoute } from "@router/RouteGuard/Private.tsx";
import { UserAndAdminRoute } from "@router/RouteGuard/UserAndAdminRoute.tsx";
import { AdminRoute } from "@router/RouteGuard/AdminRoute.tsx";

// Spinner можно будет заменить на Skeleton различный в дальнейшем

export const router = createBrowserRouter([
  {
    path: "auth",
    loader: PublicRoute,
    element: <LoginPageLazy />,
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
            <WarehousePageLazy />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        loader: UserAndAdminRoute,
        path: "dashboard",

        element: (
          <Suspense key="dashboard" fallback={<Spinner />}>
            <DashboardPageLazy />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        loader: UserAndAdminRoute,
        path: "division/:id",
        element: (
          <Suspense key="division" fallback={<Spinner />}>
            <DivisionPageLazy />
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
                <UsersPageLzy />
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
                  <CanEditGuard>
                    <UserCard />
                  </CanEditGuard>
                ),
              },
            ],
          },
          {
            loader: AdminRoute,
            path: "cartrideModel",
            element: (
              <Suspense key="cartrideModel" fallback={<Spinner />}>
                <CartridgeModelPageLazy />
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
            <ProfilePageLaze />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны
        element: (
          <Suspense key="reports" fallback={<Spinner />}>
            <ReportsPageLazy />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
