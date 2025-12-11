import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { AppSideBar } from "@/widgets/sidebar/AppSideBar";
import { MainProvider } from "@app-providers/MainProvider";

export function MainLayout() {
  return (
    <MainProvider>
      <div className="flex h-svh w-full">
        <AppSideBar />
        <main className="flex-1 overflow-auto">
          <Toaster richColors />
          <Outlet />
        </main>
      </div>
    </MainProvider>
  );
}
