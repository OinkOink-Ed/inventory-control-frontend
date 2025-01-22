import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/router";
import { ThemeProvider } from "./app/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstans } from "./app/queryClientInstans";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* Для того, чтобы режимы хорошо работали нужно разобраться как на это влияет css, пока что просто не задаю backgdround */}
    <QueryClientProvider client={queryClientInstans}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
