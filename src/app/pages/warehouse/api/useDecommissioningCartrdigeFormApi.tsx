import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  decommissioningControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning =
  () => {
    return useApiMutation(decommissioningControllerCreate);
  };

export const useDecommissioningCartrdigeFormApiCartridgeModelGetAll = (
  warehouseId: number,
) => {
  return useApiQuery(
    () => cartridgeModelControllerGetMogetModelsByWarehousedels(warehouseId),
    {
      queryKey: ["modelsCartridges"],
      enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
    },
  );
};
