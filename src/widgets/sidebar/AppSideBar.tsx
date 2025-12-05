import { Archive, LogOut, User } from "lucide-react";
import { AdminAndUserItemsMenu } from "./components/AdminAndUserItemsMenu";
import { AdminItemsMenu } from "./components/AdminItemsMenu";
import { SidebarNavLink } from "./components/SidebarNavLink";
import { useRoleContext } from "@app-providers/RoleProvider/hooks/useRoleContext";
import { useMemo } from "react";
import { useLogout } from "@/lib/hooks/useLogout";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSideBar() {
  const logoutHandler = useLogout();

  const { roleName } = useRoleContext();

  const isAdmin = useMemo(() => roleName === "admin", [roleName]);
  const isUser = useMemo(() => roleName === "user", [roleName]);
  const hasAccess = useMemo(() => isAdmin || isUser, [isAdmin, isUser]);

  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroupLabel>Профиль</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent className="w-[230px]">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavLink to="/profile">
                    <User className="h-4 w-4" />
                    <span className="text-sm">Профиль</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroupLabel>Панель управления</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {hasAccess && <AdminAndUserItemsMenu />}
              {isAdmin && <AdminItemsMenu />}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <SidebarNavLink to="reports">
                    <Archive className="h-4 w-4" />
                    <span className="text-sm">Отчёты</span>
                  </SidebarNavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => void logoutHandler()}>
              <LogOut />
              Выход
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
