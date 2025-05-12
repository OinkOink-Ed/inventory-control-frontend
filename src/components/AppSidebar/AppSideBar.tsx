import { Book, ChevronRight, LogOut, PackageCheck, User } from "lucide-react";
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
import { handlerError } from "@/app/helpers/handlerError";
import { toast } from "sonner";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";

export function AppSideBar() {
  const profile = useProfileStore;
  const navigate = useNavigate();

  const { data: dataWarehouse } = useIndexReactQuery().warehouseGetAll;
  const { data: dataDivision } = useIndexReactQuery().divisionGetAll;

  let itemsWarehouses;
  let itemsDivision;

  if (dataWarehouse) {
    itemsWarehouses = dataWarehouse.data.map((item, index) => ({
      title: `Склад №${index + 1}`,
      url: `/warehouse/${item.id}`,
      icon: PackageCheck,
    }));
  }

  if (dataDivision) {
    itemsDivision = dataDivision.data.map((item) => ({
      title: `${item.name}`,
      url: `division/${item.id}`,
      icon: Book,
    }));
  }

  async function logout() {
    try {
      const refreshToken = profile.getState().refresh_token;

      await authControllerLogout({ token: refreshToken });

      profile.getState().clearProfile();
      profile.persist.clearStorage();
      void navigate("/auth");
    } catch (error) {
      const message = handlerError(error);
      console.log("1 ошибка");

      if (message) {
        toast.error(message, {
          position: "top-center",
        });
        setTimeout(() => {
          profile.getState().clearProfile();
          profile.persist.clearStorage();
          void navigate("/auth");
        }, 1000);
      } else {
        toast.error("Неизвестная ошибка!", {
          position: "top-center",
        });
      }
    }
  }

  return (
    <Sidebar collapsible="none" className="w-[322px]">
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

        {/* Временно тут для понимания того, что видит пользователь я тестирую под админом */}
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
          <>
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
          </>
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
                            <span>Подразделения</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      </SidebarMenuItem>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {itemsDivision ? (
                            itemsDivision.map((item) => (
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
              Выход
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
