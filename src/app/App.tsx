import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./ThemeProvider";
import { queryClientInstans } from "./queryClientInstans";
import { Outlet } from "react-router";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClientInstans}>
        <main className="flex h-svh w-full">
          {/* <NavBar/> TODO Продумать бар навигации*/}
          <Outlet />
          <Toaster />
        </main>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
