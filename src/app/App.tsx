import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { queryClientInstans } from "./queryClientInstans";
import { AppLayout } from "./Layouts/AppLayout";

export function App() {
  return (
    <QueryClientProvider client={queryClientInstans}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppLayout />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
