import { useApiQuery } from "@/shared/api/hooks/useApi";
import { userControllerGetAll } from "@api/gen";
import { useMatch } from "react-router";

export const useUsersTableApi = () => {
  return useApiQuery(userControllerGetAll, {
    queryKey: ["users", "table"],
    enabled: !!useMatch({ path: "/users", end: true }),
  });
};
