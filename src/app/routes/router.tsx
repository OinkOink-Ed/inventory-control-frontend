import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../ErrorBoundary";
import { Suspense } from "react";
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

            // TODO список складов + операции
            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <Warehouse />
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
            path: "supplement",

            // TODO список моделей картриджей + операции

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                <SupplementLayout />
              </Suspense>
            ),
          },
          {
            path: "kabinets",

            // TODO список кабинетов + операции

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                {/* <SupplementLayout /> */}
              </Suspense>
            ),
          },
          {
            path: "divisions",

            // TODO список подразделений + операции

            element: (
              <Suspense fallback={<SpinnerLoad />}>
                {/* <SupplementLayout /> */}
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
