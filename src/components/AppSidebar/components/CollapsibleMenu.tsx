import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { memo, ReactNode } from "react";
import { MenuItem } from "../types/MenuItem";
import { SidebarNavLink } from "@/components/AppSidebar/components/SidebarNavLink";
import { useLocation } from "react-router";

interface CollapsibleMenuProps {
  name: string;
  icon: ReactNode;
  title: string;
  items: MenuItem[];
}

export const CollapsibleMenu = memo(function CollapsibleMenu({
  icon,
  name,
  items,
  title,
}: CollapsibleMenuProps) {
  const location = useLocation();
  const isWarehouseOpen = location.pathname.startsWith(`${name}`)
    ? true
    : false;

  return (
    <Collapsible className="group/collapsible" defaultOpen={isWarehouseOpen}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            {icon}
            <span>{title}</span>
            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
      </SidebarMenuItem>
      <CollapsibleContent>
        <SidebarMenuSub>
          {items.length > 0 ? (
            items.map((item) => (
              <SidebarMenuSubItem key={item.url}>
                <SidebarMenuButton>
                  <SidebarNavLink to={item.url}>
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))
          ) : (
            <div>Идёт загрузка</div>
          )}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
});
