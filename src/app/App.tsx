import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./ThemeProvider";
import { queryClientInstans } from "./queryClientInstans";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClientInstans}>
        <div>
          App
          <Toaster />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
