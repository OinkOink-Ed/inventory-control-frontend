import { AppSideBar } from "@/components/AppSidebar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { SocketProvider } from "../SocketContext";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <SocketProvider>
        <main className="flex h-svh w-full">
          <Toaster richColors />
          <AppSideBar />
          <Outlet />
        </main>
      </SocketProvider>
    </SidebarProvider>
  );
}
