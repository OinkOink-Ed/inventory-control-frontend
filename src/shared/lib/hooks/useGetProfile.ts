import { useApiQuery } from "@/shared/api/hooks/useApi";
import { userControllerGetProfile } from "@api/gen";

export const useGetProfile = () => {
  return useApiQuery(userControllerGetProfile, {
    queryKey: ["profile"],
    enabled: true,
  });
};
