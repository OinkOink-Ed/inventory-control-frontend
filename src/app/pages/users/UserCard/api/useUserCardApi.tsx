import { userControllerGetCardUser } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useUserCardApi = (id: number) => {
  return useQuery({
    queryKey: ["cartridgeAcceptedByStaffId", id],
    queryFn: () => userControllerGetCardUser(id),
    enabled: !!useMatch({ path: "/users/*", end: true }),
  });
};
