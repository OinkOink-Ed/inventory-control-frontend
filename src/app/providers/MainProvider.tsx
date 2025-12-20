import { ProfileProvider } from "@/shared/providers/ProfileProvider";
import { SocketProvider } from "./SocketProvider";
import type { PropsWithChildren } from "react";
import { SidebarProvider } from "@/ui/sidebar";

export function MainProvider({ children }: PropsWithChildren) {
  return (
    <ProfileProvider>
      <SocketProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SocketProvider>
    </ProfileProvider>
  );
}
