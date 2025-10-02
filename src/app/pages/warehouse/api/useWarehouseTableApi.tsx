import { cartridgeControllerGetCartridgesByWarehouse } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useWarehouseTableApi = (id: number) => {
  return useApiQuery({
    queryKey: ["cartridges", id],
    queryFn: () => cartridgeControllerGetCartridgesByWarehouse(id),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });
};
