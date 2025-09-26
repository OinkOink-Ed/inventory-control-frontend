import { userControllerCanEditUser } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";

export const usePreRequestWrapperForAccessApi = (id: number) => {
  return useQuery({
    queryKey: ["canEdit", id],
    queryFn: () => userControllerCanEditUser(id),
    enabled: !!id,
  });
};
