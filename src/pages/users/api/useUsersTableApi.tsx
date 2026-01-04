import { useApiSuspenseQuery } from "@/shared/api";
import { userControllerGetAll } from "@api/gen";

export const useUsersTableApi = () => {
  return useApiSuspenseQuery(userControllerGetAll, {
    queryKey: ["users", "table"],
  });
};
