import { lazy } from "react";

export const ReportsPageLazy = lazy(
  () => import("@/pages/reports/ui/ReportsPage"),
);

export default function ReportsPage() {
  return <div className="flex h-svh w-full grow flex-col"></div>;
}
