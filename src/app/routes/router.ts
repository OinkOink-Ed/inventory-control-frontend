import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { App } = await import("@/app/App");
      return { Component: App };
    },
  },
]);
