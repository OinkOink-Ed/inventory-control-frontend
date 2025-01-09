import { AppSideBar } from "@/components/AppSideBar";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

// Нужно реализовать роли через Context Provider

export function AppLayout() {
  // Это пример из доки shdcn - не ясно работает ли он
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  // TODO Базовые стили приложения
  return (
    <SidebarProvider /*defaultOpen={defaultOpen}*/>
      <main className="flex h-svh w-full">
        <Toaster />
        <AppSideBar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
