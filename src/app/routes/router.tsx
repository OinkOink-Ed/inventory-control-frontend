import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "../ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { App } = await import("@/app/App");
      return { Component: App };
    },
    children: [
      {
        index: true,

        // TODO подумать какой компонент будет отображаться сразу
        // async lazy() {
        //   const { AdminPanel } = await import(
        //     "@/app/pages/AdminPanel/AdminPanel"
        //   );
        //   return { Component: AdminPanel };
        // },
      },
      {
        path: "management",
        // loader:  TODO проверка доступа нужна + загрузка данных
        async lazy() {
          const { AdminPanel } = await import(
            "@/app/pages/AdminPanel/AdminPanel"
          );
          return { Component: AdminPanel };
        },
      },
      {
        path: "profile",
        // TODO А нужен ли мне компонент профиля
        // async lazy() {
        //   const { AdminPanel } = await import(
        //     "@/app/pages/AdminPanel/AdminPanel"
        //   );
        //   return { Component: AdminPanel };
        // },
      },
      {
        path: "reports",
        // TODO Подумать какие отчёты нужны
        // async lazy() {
        //   const { AdminPanel } = await import(
        //     "@/app/pages/AdminPanel/AdminPanel"
        //   );
        //   return { Component: AdminPanel };
        // },
      },
      {
        path: "delivery",
        // TODO Получается, что тут будет реализован выбор катриджа и его модели для выдачи + генерация пдф
        // async lazy() {
        //   const { AdminPanel } = await import(
        //     "@/app/pages/AdminPanel/AdminPanel"
        //   );
        //   return { Component: AdminPanel };
        // },
      },
    ],
    errorElement: <ErrorBoundary />,
  },
]);
