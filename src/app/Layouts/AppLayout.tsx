import { AppSideBar } from "@/components/AppSidebar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function AppLayout() {
  // Это пример из доки shdcn - не ясно работает ли он
  // const cookieStore = await cookies();
  // const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  // TODO Базовые стили приложения
  return (
    <SidebarProvider /*defaultOpen={defaultOpen}*/>
      <main className="flex h-svh w-full">
        <Toaster richColors />
        <AppSideBar />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
