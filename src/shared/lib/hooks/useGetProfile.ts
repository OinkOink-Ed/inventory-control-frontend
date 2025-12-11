import { useApiSuspenseQuery } from "@/shared/api/hooks/useApi";
import { userControllerGetProfile } from "@api/gen";

export const useGetProfile = () => {
  return useApiSuspenseQuery(userControllerGetProfile, {
    queryKey: ["profile"],
  });
};
