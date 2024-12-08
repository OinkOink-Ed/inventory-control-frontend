import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./providers/queryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./providers/ThemeProvider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <div>
          App
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
