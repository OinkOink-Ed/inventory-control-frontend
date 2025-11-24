import { useApiQuery } from "@/shared/api";
import { userControllerCanEditUser } from "@/shared/api/generated";

export const usePreRequestWrapperForAccessApi = (id: number) => {
  return useApiQuery(() => userControllerCanEditUser(id), {
    queryKey: ["canEdit", id],
    enabled: !!id,
  });
};
