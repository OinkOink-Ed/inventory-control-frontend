import { ThemeProvider } from "@api/index";
import { queryClientInstans } from "@api/queryClientInstans";
import { router } from "@router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";

export function App() {
  return (
    <QueryClientProvider client={queryClientInstans}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
