import { AppSideBar } from "@/components/AppSidebar/AppSideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { SocketProvider } from "../providers/SocketProvider";
import { RoleProvider } from "../providers/RoleProvider";

export default function AppLayout() {
  return (
    <RoleProvider>
      <SocketProvider>
        <SidebarProvider>
          <main className="flex h-svh w-full">
            <Toaster richColors />
            <AppSideBar />
            <Outlet />
          </main>
        </SidebarProvider>
      </SocketProvider>
    </RoleProvider>
  );
}
