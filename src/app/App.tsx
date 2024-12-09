import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./ThemeProvider";
import { queryClientInstans } from "./queryClientInstans";
import { AppLayout } from "./Layouts/AppLayout";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClientInstans}>
        <AppLayout />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
