// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/router";
import { ThemeProvider } from "./app/ThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstans } from "./app/queryClientInstans";
import { SocketProvider } from "./app/SocketContext";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <QueryClientProvider client={queryClientInstans}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </ThemeProvider>
  </QueryClientProvider>,
  // </StrictMode>,
);
