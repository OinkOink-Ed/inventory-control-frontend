import { userControllerCanEditUser } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";

export const usePreRequestWrapperForAccessApi = (id: number) => {
  return useApiQuery({
    queryKey: ["canEdit", id],
    queryFn: () => userControllerCanEditUser(id),
    enabled: !!id,
  });
};
