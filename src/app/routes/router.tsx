import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../ErrorBoundary";
import publicRoute from "./loaders/Public";
import privateRoute from "./loaders/Private";
import LoginSkeleton from "../pages/auth/LoginSkeleton";

export const router = createBrowserRouter([
  {
    path: "auth",
    loader: publicRoute,
    async lazy() {
      const { Login } = await import("@/app/pages/auth/Login");
      return { Component: Login };
    },
    hydrateFallbackElement: <LoginSkeleton />,
    errorElement: <ErrorBoundary />,
  },

  {
    async lazy() {
      const { AppLayout } = await import("@/app/Layouts/AppLayout");
      return { Component: AppLayout };
    },
    children: [
      {
        path: "/",
        // TODO Получается, что тут будет реализован выбор катриджа и его модели для выдачи + генерация пдф

        loader: privateRoute,

        async lazy() {
          const { Delivery } = await import("@/app/pages/delivery/Delivery");
          return { Component: Delivery };
        },
      },
      {
        // loader:  TODO проверка доступа нужна
        async lazy() {
          const { ManagementLayout } = await import(
            "@/app/Layouts/ManagementLayout"
          );
          return { Component: ManagementLayout };
        },
        children: [
          {
            path: "management",

            // TODO приём картриджей поставленых в учреждение

            async lazy() {
              const { Acceptance } = await import(
                "@/app/pages/acceptance/Acceptance"
              );
              return { Component: Acceptance };
            },
          },
          {
            path: "users",

            // TODO список пользователей + создание
            async lazy() {
              const { Users } = await import("@/app/pages/users/Users");
              return { Component: Users };
            },
          },
          {
            path: "supplement",

            // TODO Добавление новых моделей картриджей

            async lazy() {
              const { Supplement } = await import(
                "@/app/pages/supplement/Supplement"
              );
              return { Component: Supplement };
            },
          },
        ],
        errorElement: <ErrorBoundary />,
      },
      {
        path: "profile",
        // TODO Компонент профиля
        async lazy() {
          const { Profile } = await import("@/app/pages/profile/Profile");
          return { Component: Profile };
        },
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны
        async lazy() {
          const { Reports } = await import("@/app/pages/reports/Reports");
          return { Component: Reports };
        },
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
