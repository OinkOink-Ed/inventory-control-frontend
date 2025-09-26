import { userControllerGetCardUserAcceptedCartridge } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useUserCardTableProps = (id: number) => {
  return useQuery({
    queryKey: ["accepted-cartridge", id],
    queryFn: () => userControllerGetCardUserAcceptedCartridge(id),
    enabled: !!useMatch({ path: "/users/:id" }),
  });
};
