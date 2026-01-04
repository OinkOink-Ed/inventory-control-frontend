import { lazy } from "react";
import { Outlet } from "react-router";

export const UsersPageLzy = lazy(() => import("@/pages/users/ui/UsersPage"));

export default function UsersPage() {
  return (
    <div className="flex h-svh w-full">
      <Outlet />
    </div>
  );
}
