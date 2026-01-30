import { createContext, type ReactNode } from "react";

export const DataTableContext = createContext<{
  toolbarActions: ReactNode;
  setToolbarActions: (node: ReactNode) => void;
} | null>(null);
