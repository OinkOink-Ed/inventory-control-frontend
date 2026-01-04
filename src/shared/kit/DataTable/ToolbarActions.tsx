import { useDataTableActions } from "@/kit/DataTable/hooks/useDataTableActions.tsx";
import { type PropsWithChildren, useEffect } from "react";

export function ToolbarActions({ children }: PropsWithChildren) {
  const { setToolbarActions } = useDataTableActions();

  useEffect(() => {
    setToolbarActions(children);
  }, [children, setToolbarActions]);

  return null;
}
