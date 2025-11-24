import { PropsWithChildren, useEffect } from "react";
import { useDataTableActions } from "./hooks/useDataTableActions";

export function ToolbarActions({ children }: PropsWithChildren) {
  const { setToolbarActions } = useDataTableActions();

  useEffect(() => {
    setToolbarActions(children);
  }, [children, setToolbarActions]);

  return null;
}
