import { use } from "react";
import { DataTableContext } from "./useDataTableContext";

export const useDataTableActions = () => {
  const context = use(DataTableContext);
  if (!context) throw new Error("Use inside DataTable");
  return context;
};
