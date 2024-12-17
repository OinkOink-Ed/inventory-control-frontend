import { Archive, Book, Home, PackageCheck, User, User2 } from "lucide-react";
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
} from "./ui/sidebar";

const itemsUser = [
  {
    title: "Выдача",
    url: "/",
    icon: Home,
  },
  {
    title: "Профиль",
    url: "/profile",
    icon: User,
  },
  {
    title: "Отчёты",
    url: "/reports",
    icon: Archive,
  },
];

const itemsAdmin = [
  {
    title: "Пользователи",
    url: "/users",
    icon: User2,
  },
  {
    title: "Приём картриджей",
    url: "/management",
    icon: PackageCheck,
  },
  {
    title: "Модели картриджей",
    url: "/supplement",
    icon: Book,
  },
];

export function AppSideBar() {
  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroupLabel>Inventory</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsUser.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Отображать через условный рендеринг */}
        <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsAdmin.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Нужно дать сюда логику выхода */}
            <SidebarMenuButton>Выход</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
