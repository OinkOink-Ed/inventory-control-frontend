import { Archive, Bolt, Book, PackageCheck, User } from "lucide-react";
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
} from "./ui/Sidebar/sidebar";

// Нужно будет вынести константу (сделать их две + отдавать сюда в зависимости от роли)

const items = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Панель Администратора",
    url: "/management",
    icon: Bolt,
  },
  {
    title: "Приём картриджей",
    url: "/",
    icon: PackageCheck,
  },
  {
    title: "Модели картриджей",
    url: "/supplement",
    icon: Book,
  },
  {
    title: "Отчёты",
    url: "/reports",
    icon: Archive,
  },
];

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Inventory</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
