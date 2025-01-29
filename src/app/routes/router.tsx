import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../ErrorBoundary";
import PublicRoute from "./loaders/Public";
import PrivateRoute from "./loaders/Private";
import AdminRoute from "./loaders/AdminRoute";
import { Suspense } from "react";
import LoginSkeleton from "../pages/auth/LoginSkeleton";
import {
  AppLayout,
  Delivery,
  LoginLayout,
  ManagementLayout,
  Profile,
  Reports,
  SupplementLayout,
  UsersLayout,
  Warehouse,
} from "../lazyImports";
import { SpinnerLoad } from "@/components/SpinnerLoad";

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
            <Delivery />
          </Suspense>
        ),
      },
      {
        loader: AdminRoute,

        element: (
          <Suspense fallback={<SpinnerLoad />}>
            <ManagementLayout />
          </Suspense>
        ),
        children: [
          {
            path: "management",

            // TODO приём картриджей поставленых в учреждение
            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <Warehouse />
              </Suspense>
            ),
          },
          {
            path: "users",

            // TODO список пользователей + создание

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <UsersLayout />
              </Suspense>
            ),
          },
          {
            path: "supplement",

            // TODO Добавление новых моделей картриджей

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <SupplementLayout />
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
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны

        element: (
          <Suspense fallback={<SpinnerLoad />}>
            <Reports />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
