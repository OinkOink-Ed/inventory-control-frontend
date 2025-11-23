import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/router";
import { ThemeProvider } from "./app/providers/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstans } from "./app/queryClientInstans";
import { RoleProvider } from "./app/providers/RoleProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientInstans}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RoleProvider>
          <RouterProvider router={router} />
        </RoleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
