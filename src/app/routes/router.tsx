import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../ErrorBoundary";
import { Suspense } from "react";
import {
  AppLayout,
  CartridgeModelLayout,
  DeliveryLayout,
  DivisionLayout,
  LoginLayout,
  ProfileLayout,
  ReportsLayout,
  UsersLayout,
  WarehouseLayout,
} from "../lazyImports";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import PublicRoute from "./loaders/Public";
import LoginSkeleton from "../pages/auth/LoginSkeleton";
import PrivateRoute from "./loaders/Private";
import AdminRoute from "./loaders/AdminRoute";

// SpinnerLoad можно будет заменить на Skeleton различный в дальнейшем

export const router = createBrowserRouter([
  {
    path: "auth",
    loader: PublicRoute,
    element: (
      <Suspense fallback={<LoginSkeleton />}>
        <LoginLayout />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    element: (
      <Suspense fallback={<SpinnerLoad />}>
        <AppLayout />
      </Suspense>
    ),

    children: [
      {
        path: "/",
        // TODO Получается, что тут будет реализован выбор катриджа и его модели для выдачи + генерация пдф
        loader: PrivateRoute,

        element: (
          <Suspense fallback={<SpinnerLoad />}>
            <DeliveryLayout />
          </Suspense>
        ),
      },
      {
        loader: AdminRoute,
        children: [
          {
            path: "warehouse/:id",

            // TODO список складов + операции
            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <WarehouseLayout />
              </Suspense>
            ),
          },
          {
            path: "users",

            // TODO список пользователей + операции

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <UsersLayout />
              </Suspense>
            ),
          },
          {
            path: "cartrideModel",

            // TODO список моделей картриджей + операции

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <CartridgeModelLayout />
              </Suspense>
            ),
          },
          {
            path: "division/:id",

            // TODO список подразделений + операции

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <DivisionLayout />
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
          <Suspense fallback={<SpinnerLoad />}>
            <ProfileLayout />
          </Suspense>
        ),
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны

        element: (
          <Suspense fallback={<SpinnerLoad />}>
            <ReportsLayout />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
