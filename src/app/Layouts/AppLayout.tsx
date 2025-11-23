import { AppSideBar } from "@/components/AppSidebar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { SocketProvider } from "../providers/SocketProvider";

export default function AppLayout() {
  return (
    <SocketProvider>
      <SidebarProvider>
        <main className="flex h-svh w-full">
          <Toaster richColors />
          <AppSideBar />
          <Outlet />
        </main>
      </SidebarProvider>
    </SocketProvider>
  );
}
