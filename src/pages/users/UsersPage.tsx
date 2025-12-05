import { Outlet } from "react-router";

export default function UsersPage() {
  return (
    <div className="flex h-svh w-full">
      <Outlet />
    </div>
  );
}
