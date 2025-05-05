import { ChevronRight, LogOut, PackageCheck, User } from "lucide-react";
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
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { Collapsible } from "../ui/collapsible";
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { itemsAdmin, itemsUser } from "./itemsForSidebar";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { authControllerLogout } from "@/app/api/generated";
import { Auth } from "@/app/helpers/interfaces";
import { handlerError } from "@/app/helpers/handlerError";
import { toast } from "sonner";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";

export function AppSideBar() {
  const exitProfileStore = useProfileStore.persist.clearStorage;
  const navigate = useNavigate();

  //На сервере как закончу обработку отдачи либо всех складов для админа, либо одного склада для пользователя
  //Нужно будет добавить такой элемент в sidebar по условной отрисовке
  const { data } = useIndexReactQuery().warehouseGetAll;

  let itemsWarehouses;

  if (data) {
    itemsWarehouses = data.data.map((item, index) => ({
      title: `Склад №${index + 1}`,
      url: `/warehouse-${index + 1}`,
      icon: PackageCheck,
    }));
  }

  async function logout() {
    try {
      const storedAuth = localStorage.getItem("profileStorage");

      if (!storedAuth) {
        return false;
      }

      const parsedAuth = JSON.parse(storedAuth) as Auth;
      const refreshToken = parsedAuth.state.refresh_token;

      if (!refreshToken) {
        return false;
      }

      await authControllerLogout({ token: refreshToken });
      exitProfileStore();
      await navigate("/");
    } catch (error) {
      const message = handlerError(error);

      if (message) {
        toast.error(message, {
          position: "top-center",
        });
        setTimeout(() => {
          exitProfileStore();
          void navigate("/");
        }, 1000);
      } else {
        toast.error("Неизвестная ошибка!", {
          position: "top-center",
        });
      }
    }
  }

  return (
    <Sidebar collapsible="none">
      <SidebarContent>
        <SidebarGroupLabel>Profile</SidebarGroupLabel>
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

        <SidebarGroupLabel>Inventory</SidebarGroupLabel>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {decryptedProfile().role.roleName !== "user" ? (
                <></>
              ) : itemsWarehouses ? (
                itemsWarehouses.map((item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}></Link>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              ) : (
                <div>Идёт загрузка</div>
              )}
              {itemsUser.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {decryptedProfile()?.role.roleName !== "admin" ? (
          <></>
        ) : (
          <>
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {itemsAdmin.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  <SidebarMenu>
                    <Collapsible className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton>
                            <PackageCheck />
                            <span>Склады</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {itemsWarehouses ? (
                            itemsWarehouses.map((item) => (
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
                  </SidebarMenu>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                void logout();
              }}
            >
              <LogOut />
              <Link to={"/auth"}>Выход</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
