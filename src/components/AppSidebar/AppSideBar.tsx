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
import { Link, useNavigate } from "react-router";
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
    () => (title: string, items: MenuItem[], icon: React.ReactNode) => (
      <Collapsible className="group/collapsible">
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
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
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
    <Sidebar collapsible="none" className="w-[322px]">
      <SidebarContent>
        <SidebarGroupLabel>Профиль</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={`profile`}>
                    <User />
                    Профиль
                  </Link>
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
                    <SidebarMenuButton asChild>
                      <Link to={"dashboard"}>
                        <LayoutDashboard />
                        Дашборд
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={"users"}>
                        <User2 />
                        Пользователи
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {renderCollapsibleMenu(
                    "Склады",
                    itemsWarehouses,
                    <PackageCheck />,
                  )}

                  {renderCollapsibleMenu(
                    "Подразделения",
                    itemsDivision,
                    <PackageCheck />,
                  )}
                </>
              )}
              {/* Меню для админа */}
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to={"cartrideModel"}>
                      <Book />
                      Модели картриджей
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={"reports"}>
                    <Archive />
                    Отчёты
                  </Link>
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
