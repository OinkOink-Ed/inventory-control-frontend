import { userControllerCanEditUser } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";

export const usePreRequestWrapperForAccessApi = (id: number) => {
  return useApiQuery(() => userControllerCanEditUser(id), {
    queryKey: ["canEdit", id],
    enabled: !!id,
  });
};
