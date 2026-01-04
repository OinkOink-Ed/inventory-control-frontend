import { DataTableContext } from "@/kit/DataTable/hooks/useDataTableContext.ts";
import { type PropsWithChildren, type ReactNode, useState } from "react";

export function DataTableProvider({ children }: PropsWithChildren) {
  const [toolbarActions, setToolbarActions] = useState<ReactNode>(null);
  return (
    <DataTableContext value={{ toolbarActions, setToolbarActions }}>
      {children}
    </DataTableContext>
  );
}
