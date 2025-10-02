import { userControllerGetCardUserAcceptedCartridge } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useUserCardTableProps = (id: number) => {
  return useApiQuery({
    queryKey: ["accepted-cartridge", id],
    queryFn: () => userControllerGetCardUserAcceptedCartridge(id),
    enabled: !!useMatch({ path: "/users/:id" }),
  });
};
