import { cartridgeControllerGetCartridgesByWarehouse } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useWarehouseTableApi = (id: number) => {
  return useApiQuery(() => cartridgeControllerGetCartridgesByWarehouse(id), {
    queryKey: ["cartridges", id],
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });
};
