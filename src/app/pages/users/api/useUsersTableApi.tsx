import { userControllerGetAll } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useUsersTableApi = () => {
  return useApiQuery(userControllerGetAll, {
    queryKey: ["users", "table"],
    enabled: !!useMatch({ path: "/users", end: true }),
  });
};
