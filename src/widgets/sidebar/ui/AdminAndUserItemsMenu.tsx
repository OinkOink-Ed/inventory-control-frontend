import { Book, LayoutDashboard, PackageCheck, User2 } from "lucide-react";
import { useNavigate } from "react-router";
import { memo, useEffect, useMemo } from "react";
import { handlerError } from "@/lib/helpers";
import { SidebarMenuButton, SidebarMenuItem } from "@/shared/ui/sidebar";
import { ANSWER } from "@/lib/const";
import {
  useAppSideBarApiDivisionGetAll,
  useAppSideBarApiWarehouseGetAll,
} from "@/widgets/sidebar/api/useAppSideBarApi.tsx";
import { SidebarNavLink } from "@/widgets/sidebar/ui/SidebarNavLink.tsx";
import { CollapsibleMenu } from "@/widgets/sidebar/ui/CollapsibleMenu.tsx";

export const AdminAndUserItemsMenu = memo(function AdminAndUserItemsMenu() {
  const navigate = useNavigate();

  const { data: dataDivision, error: errorDivivosn } =
    useAppSideBarApiDivisionGetAll();
  const { data: dataWarehouses, error: errorWarehouses } =
    useAppSideBarApiWarehouseGetAll();

  useEffect(() => {
    if (errorDivivosn || errorWarehouses) {
      const res = handlerError(errorDivivosn ?? errorWarehouses);
      if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
    }
  }, [navigate, errorWarehouses, errorDivivosn]);

  const itemsDivision = useMemo(
    () =>
      dataDivision?.map((item) => ({
        title: item.name,
        url: `division/${String(item.id)}`,
        icon: Book,
      })) ?? [],
    [dataDivision],
  );

  const itemsWarehouses = useMemo(
    () =>
      dataWarehouses?.map((item, index) => ({
        title: `Склад №${String(index + 1)}`,
        url: `/warehouse/${String(item.id)}`,
        icon: PackageCheck,
      })) ?? [],
    [dataWarehouses],
  );

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <SidebarNavLink to="dashboard">
            <LayoutDashboard className="h-4 w-4" />
            <span className="text-sm">Дашборд</span>
          </SidebarNavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <SidebarNavLink to="users">
            <User2 className="h-4 w-4" />
            <span className="text-sm">Пользователи</span>
          </SidebarNavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <CollapsibleMenu
        icon={<PackageCheck />}
        items={itemsWarehouses}
        title="Склады"
        name="/warehouse"
      />

      <CollapsibleMenu
        icon={<PackageCheck />}
        items={itemsDivision}
        title="Подразделения"
        name="/division"
      />
    </>
  );
});
