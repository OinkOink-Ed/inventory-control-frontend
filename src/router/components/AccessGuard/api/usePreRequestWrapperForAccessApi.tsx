import { useApiQuery } from "@/shared/api";
import { userControllerCanEditUser } from "@api/gen";

export const usePreRequestWrapperForAccessApi = (id: number) => {
  return useApiQuery(() => userControllerCanEditUser(id), {
    queryKey: ["canEdit", id],
    enabled: !!id,
  });
};
