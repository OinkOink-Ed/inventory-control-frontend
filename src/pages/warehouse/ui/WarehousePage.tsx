import { WarehouseTable } from "@pages/warehouse";
import { lazy } from "react";

export const WarehousePageLazy = lazy(
  () => import("@/pages/warehouse/ui/WarehousePage"),
);

export default function WarehousePage() {
  return (
    <main className="flex h-svh w-full">
      <WarehouseTable />
    </main>
  );
}
