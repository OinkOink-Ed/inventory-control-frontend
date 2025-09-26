import { cartridgeControllerGetCartridgesByWarehouse } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useWarehouseTableApi = (id: number) => {
  return useQuery({
    queryKey: ["cartridges", id],
    queryFn: () => cartridgeControllerGetCartridgesByWarehouse(id),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });
};
