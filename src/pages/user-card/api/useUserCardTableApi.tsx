import { userControllerGetCardUserAcceptedCartridge } from "@api/gen";
import { useApiSuspenseQuery } from "@api/index.ts";

export const useUserCardTableProps = (id: number) => {
  return useApiSuspenseQuery(
    () => userControllerGetCardUserAcceptedCartridge(id),
    {
      queryKey: ["accepted-cartridge", id],
    },
  );
};
