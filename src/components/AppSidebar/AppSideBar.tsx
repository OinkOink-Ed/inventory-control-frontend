import {
  Archive,
  Book,
  ChevronRight,
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
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { authControllerLogout } from "@/app/api/generated";
import { handlerError } from "@/app/helpers/handlerError";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";
import { Answer } from "@/app/Errors/Answer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useEffect } from "react";
import { queryClientInstans } from "@/app/queryClientInstans";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export function AppSideBar() {
  const refreshToken = useProfileStore((state) => state.refresh_token);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const navigate = useNavigate();

  const { data: dataDivision, error: errorDivivosn } =
    useIndexReactQuery().divisionGetAll;
  const { data: dataWarehouses, error: errorWarehouses } =
    useIndexReactQuery().warehouseGetAll;

  useEffect(() => {
    if (errorDivivosn || errorWarehouses) {
      const res = handlerError(errorDivivosn ?? errorWarehouses);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
    }
  }, [navigate, errorWarehouses, errorDivivosn]);

  const itemsDivision =
    dataDivision?.data.map((item) => ({
      title: `${item.name}`,
      url: `division/${item.id}`,
      icon: Book,
    })) ?? [];

  const itemsWarehouses =
    dataWarehouses?.data.map((item, index) => ({
      title: `Склад №${index + 1}`,
      url: `/warehouse/${item.id}`,
      icon: PackageCheck,
    })) ?? [];

  async function logout() {
    try {
      await authControllerLogout({ token: refreshToken });

      clearProfile();
      void queryClientInstans.removeQueries();
      void navigate("/auth");
    } catch (error) {
      const res = handlerError(error);
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
    }
  }

  const profile = decryptedProfile();
  const isAdmin = profile?.role?.roleName === "admin";
  const isUser = profile?.role?.roleName === "user";
  const hasAccess = isAdmin || isUser;

  const renderCollapsibleMenu = (
    title: string,
    items: MenuItem[],
    icon: React.ReactNode,
  ) => (
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
                  <Link to={"profile"}>
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
            <SidebarMenuButton onClick={() => void logout()}>
              <LogOut />
              Выход
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
