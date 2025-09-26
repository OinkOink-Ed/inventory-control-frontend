import { Outlet } from "react-router";

export default function UsersLayout() {
  return (
    <div className="flex h-svh w-full">
      <Outlet />
    </div>
  );
}
