import { Outlet } from "react-router";

export default function StaffLayout() {
  return (
    <div className="flex h-svh w-full flex-grow flex-col">
      <Outlet />
    </div>
  );
}
