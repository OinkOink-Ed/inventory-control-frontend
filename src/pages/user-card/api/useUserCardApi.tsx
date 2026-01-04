import { useApiSuspenseQuery } from "@/shared/api";
import { userControllerGetCardUser } from "@api/gen";

export const useUserCardApi = (id: number) => {
  return useApiSuspenseQuery(() => userControllerGetCardUser(id), {
    queryKey: ["userCard", id],
  });
};
