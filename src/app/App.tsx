import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { queryClientInstans } from "../shared/api/queryClientInstans";
import { ThemeProvider } from "@api/hooks/theme-provider";
import { router } from "@router/router";

export function App() {
  return (
    <QueryClientProvider client={queryClientInstans}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
