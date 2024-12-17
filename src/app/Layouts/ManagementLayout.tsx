import { Outlet } from "react-router";

export function ManagementLayout() {
  // TODO Базовые стили Админ панели
  return (
    <main className="flex h-svh w-full">
      <Outlet />
    </main>
  );
}
