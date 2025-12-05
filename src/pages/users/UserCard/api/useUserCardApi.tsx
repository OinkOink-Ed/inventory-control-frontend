import { useApiQuery } from "@/shared/api/hooks/useApi";
import { userControllerGetCardUser } from "@api/gen";
import { useMatch } from "react-router";

export const useUserCardApi = (id: number) => {
  return useApiQuery(() => userControllerGetCardUser(id), {
    queryKey: ["userCard", id],
    enabled: !!useMatch({ path: "/users/*", end: true }),
  });
};
