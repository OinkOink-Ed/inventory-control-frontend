import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  PostCreateReceivingDto,
  receivingControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useReceivingCartridgeFormApiCartrdgesCreateReceiving = () => {
  return useApiMutation((data: PostCreateReceivingDto) =>
    receivingControllerCreate(data),
  );
};

export const useReceivingCartridgeFormApiCreateCartridgeModelGetAll = (
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
