import { SidebarMenuButton, SidebarMenuItem } from "@/ui/sidebar";
import { SidebarNavLink } from "@/widgets/sidebar/ui/SidebarNavLink.tsx";
import { Book } from "lucide-react";
import { memo } from "react";

export const AdminItemsMenu = memo(function AdminItemsMenu() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <SidebarNavLink to="cartrideModel">
          <Book className="h-4 w-4" />
          <span className="text-sm">Модели картриджей</span>
        </SidebarNavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});
