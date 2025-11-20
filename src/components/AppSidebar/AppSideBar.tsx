import {
  Archive,
  Book,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  LucideProps,
  PackageCheck,
  User,
  User2,
} from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { NavLink, useLocation, useNavigate } from "react-router";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useEffect, useMemo } from "react";
import {
  useAppSideBarApiDivisionGetAll,
  useAppSideBarApiWarehouseGetAll,
} from "./api/useAppSideBarApi";
import { useLogout } from "@/hooks/useLogout";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export function AppSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: dataDivision, error: errorDivivosn } =
    useAppSideBarApiDivisionGetAll();
  const { data: dataWarehouses, error: errorWarehouses } =
    useAppSideBarApiWarehouseGetAll();

  useEffect(() => {
    if (errorDivivosn || errorWarehouses) {
      const res = handlerError(errorDivivosn ?? errorWarehouses);
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
    }
  }, [navigate, errorWarehouses, errorDivivosn]);

  const logoutHandler = useLogout();

  const itemsDivision =
    dataDivision?.map((item) => ({
      title: `${item.name}`,
      url: `division/${item.id}`,
      icon: Book,
    })) ?? [];

  const itemsWarehouses =
    dataWarehouses?.map((item, index) => ({
      title: `Склад №${index + 1}`,
      url: `/warehouse/${item.id}`,
      icon: PackageCheck,
    })) ?? [];

  const profile = decryptedProfile();
  const isAdmin = profile ? profile?.role?.roleName === "admin" : profile;
  const isUser = profile ? profile?.role?.roleName === "user" : profile;
  const hasAccess = isAdmin || isUser;

  const renderCollapsibleMenu = useMemo(
    () =>
      (
        isWarehouseOpen: boolean,
        title: string,
        items: MenuItem[],
        icon: React.ReactNode,
      ) => (
        <Collapsible
          className="group/collapsible"
          defaultOpen={isWarehouseOpen}
          onOpenChange={() => isWarehouseOpen}
        >
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
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuButton>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuSubItem>
                ))
              ) : (
                <div>Идёт загрузка</div>
              )}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ),
    [],
  );

  return (
    <Sidebar collapsible="none" className="w-[272px]">
      <SidebarContent>
        <SidebarGroupLabel>Профиль</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NavLink
                    to={`/profile`}
                    className={({ isActive }) =>
                      `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
                    }
                  >
                    <User className="h-4 w-4" />
                    <span className="text-sm">Профиль</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroupLabel>Панель управления</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Меню для админа и пользователя */}
              {hasAccess && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink
                        to={"dashboard"}
                        className={({ isActive }) =>
                          `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
                        }
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="text-sm">Дашборд</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <NavLink
                        to={"users"}
                        className={({ isActive }) =>
                          `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
                        }
                      >
                        <User2 className="h-4 w-4" />
                        <span className="text-sm">Пользователи</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {renderCollapsibleMenu(
                    location.pathname.startsWith("/warehouse") ? true : false,
                    "Склады",
                    itemsWarehouses,
                    <PackageCheck />,
                  )}

                  {renderCollapsibleMenu(
                    location.pathname.startsWith("/division") ? true : false,
                    "Подразделения",
                    itemsDivision,
                    <PackageCheck />,
                  )}
                </>
              )}
              {/* Меню для админа */}
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <NavLink
                      to={"cartrideModel"}
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
                      }
                    >
                      <Book className="h-4 w-4" />
                      <span className="text-sm">Модели картриджей</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <NavLink
                    to={"reports"}
                    className={({ isActive }) =>
                      `flex items-center gap-2 ${isActive ? "text-blue-600" : "text-gray-800"}`
                    }
                  >
                    <Archive className="h-4 w-4" />
                    <span className="text-sm">Отчёты</span>
                  </NavLink>
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
