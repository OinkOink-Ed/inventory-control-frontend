import { userControllerGetCardUser } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useUserCardApi = (id: number) => {
  return useApiQuery(() => userControllerGetCardUser(id), {
    queryKey: ["userCard", id],
    enabled: !!useMatch({ path: "/users/*", end: true }),
  });
};
