import { userControllerGetProfile } from "@/app/api/generated";
import { useApiQuery } from "@/shared/api/hooks/useApi";

export const useGetProfile = () => {
  return useApiQuery(userControllerGetProfile, {
    queryKey: ["profile"],
    enabled: true,
  });
};
