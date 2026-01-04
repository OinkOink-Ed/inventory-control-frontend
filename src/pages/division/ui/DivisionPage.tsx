import { DivisionTable } from "@pages/division";
import { lazy } from "react";
export const DivisionPageLazy = lazy(
  () => import("@/pages/division/ui/DivisionPage"),
);

export default function DivisionPage() {
  return (
    <div className="flex h-svh w-full grow flex-col">
      <DivisionTable />
    </div>
  );
}
