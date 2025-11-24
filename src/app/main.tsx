import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { ThemeProvider } from "./providers/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstans } from "./queryClientInstans";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClientInstans}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
