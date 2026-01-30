import { queryClientInstans, ThemeProvider } from "@api/index";
import { router } from "@router/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { HttpClientProvider } from "@app-providers/HttpClientProvider";

export function App() {
  return (
    <HttpClientProvider>
      <QueryClientProvider client={queryClientInstans}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </HttpClientProvider>
  );
}
