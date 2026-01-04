import { DataTableContext } from "@/kit/DataTable/hooks/useDataTableContext.ts";
import { use } from "react";

export const useDataTableActions = () => {
  const context = use(DataTableContext);
  if (!context) throw new Error("Use inside DataTable");
  return context;
};
