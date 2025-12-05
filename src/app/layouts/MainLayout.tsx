import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { RoleProvider } from "@app-providers/RoleProvider/RoleProvider";
import { SocketProvider } from "@app-providers/SocketProvider/SocketProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSideBar } from "@/widgets/sidebar/AppSideBar";

export function MainLayout() {
  return (
    <RoleProvider>
      <SocketProvider>
        <SidebarProvider>
          <div className="flex h-svh w-full">
            <AppSideBar />
            <main className="flex-1 overflow-auto">
              <Toaster richColors />
              <Outlet />
            </main>
          </div>
        </SidebarProvider>
      </SocketProvider>
    </RoleProvider>
  );
}
