import { Dashboard } from "@pages/dashboards";
import { lazy } from "react";

export const DashboardPageLazy = lazy(
  () => import("@pages/dashboards/ui/DashboardPage.tsx"),
);

export default function DashboardPage() {
  return (
    <main className="flex h-svh w-full">
      <Dashboard />
    </main>
  );
}
