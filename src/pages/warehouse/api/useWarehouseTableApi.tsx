import { useApiQuery } from "@/shared/api/hooks/useApi";
import { cartridgeControllerGetCartridgesByWarehouse } from "@api/gen";
import { useMatch } from "react-router";

export const useWarehouseTableApi = (id: number | undefined) => {
  const path = useMatch({ path: "/warehouse/:id", end: true });
  return useApiQuery(
    () => {
      if (!id) throw new Error("ID не является числом");
      return cartridgeControllerGetCartridgesByWarehouse(id);
    },
    {
      queryKey: ["cartridges", id],
      enabled: !!path && !!id,
    }
  );
};
