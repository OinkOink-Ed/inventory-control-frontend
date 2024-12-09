import { AppSideBar } from "@/components/AppSideBar";
import { Outlet } from "react-router";

export function AppLayout() {
  // TODO Базовые стили приложения
  return (
    <main className="flex h-svh w-full">
      <AppSideBar />
      <Outlet />
    </main>
  );
}
