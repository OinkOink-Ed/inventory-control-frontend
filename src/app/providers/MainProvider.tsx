import { ProfileProvider } from "@/shared/providers";
import type { PropsWithChildren } from "react";
import { SidebarProvider } from "@/ui/sidebar";
import { SocketProvider } from "@app-providers/SocketProvider/SocketProvider.tsx";

export function MainProvider({ children }: PropsWithChildren) {
  return (
    <ProfileProvider>
      <SocketProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SocketProvider>
    </ProfileProvider>
  );
}
