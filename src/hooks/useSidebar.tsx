import React from "react";
import { SidebarContext as context } from "@/components/ui/sidebar";

export const SidebarContext = React.createContext<context | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}
