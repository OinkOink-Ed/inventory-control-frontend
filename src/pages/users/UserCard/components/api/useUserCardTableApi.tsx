import { userControllerGetCardUserAcceptedCartridge } from "@/app/api/generated";
import { useApiQuery } from "@/shared/api/hooks/useApi";
import { useMatch } from "react-router";

export const useUserCardTableProps = (id: number) => {
  return useApiQuery(() => userControllerGetCardUserAcceptedCartridge(id), {
    queryKey: ["accepted-cartridge", id],
    enabled: !!useMatch({ path: "/users/:id" }),
  });
};
