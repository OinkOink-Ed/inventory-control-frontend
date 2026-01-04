import { useApiSuspenseQuery } from "@/shared/api";
import { cartridgeControllerGetCartridgesByWarehouse } from "@api/gen";

export const useWarehouseTableApi = (id: number | undefined) => {
  return useApiSuspenseQuery(
    () => {
      if (!id) throw new Error("ID не является числом");
      return cartridgeControllerGetCartridgesByWarehouse(id);
    },
    {
      queryKey: ["cartridges", id],
    },
  );
};
