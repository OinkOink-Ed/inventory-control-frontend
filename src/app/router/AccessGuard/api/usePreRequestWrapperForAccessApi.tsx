import { userControllerCanEditUser } from "@api/gen";
import { useApiSuspenseQuery } from "@api/hooks/useApi";

export const usePreRequestWrapperForAccessApi = (id: number) => {
  return useApiSuspenseQuery(() => userControllerCanEditUser(id), {
    queryKey: ["canEdit", id],
  });
};
