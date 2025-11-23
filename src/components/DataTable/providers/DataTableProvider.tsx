import { PropsWithChildren, ReactNode, useState } from "react";
import { DataTableContext } from "../hooks/useDataTableContext";

export function DataTableProvider({ children }: PropsWithChildren) {
  const [toolbarActions, setToolbarActions] = useState<ReactNode>(null);
  return (
    <DataTableContext.Provider value={{ toolbarActions, setToolbarActions }}>
      {children}
    </DataTableContext.Provider>
  );
}
