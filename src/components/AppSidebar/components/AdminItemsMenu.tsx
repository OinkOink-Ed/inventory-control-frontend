import { SidebarNavLink } from "@/components/AppSidebar/components/SidebarNavLink";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
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
