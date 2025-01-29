import { Outlet } from "react-router";

export default function ManagementLayout() {
  // TODO Базовые стили Админ панели
  return (
    <main className="flex h-svh w-full">
      <Outlet />
    </main>
  );
}
