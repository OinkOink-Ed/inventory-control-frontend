import { PropsWithChildren } from "react";
import { useDataTableActions } from "./hooks/useDataTableActions";

export function ToolbarActions({ children }: PropsWithChildren) {
  const { setToolbarActions } = useDataTableActions();

  setToolbarActions(children);
  return null;
}
