import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClientProvider";
import { ThemeProvider } from "./providers/themeProvider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div>App</div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
