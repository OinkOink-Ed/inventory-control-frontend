import { useContext } from "react";
import { DataTableContext } from "./useDataTableContext";

export const useDataTableActions = () => {
  const context = useContext(DataTableContext);
  if (!context) throw new Error("Use inside DataTable");
  return context;
};
