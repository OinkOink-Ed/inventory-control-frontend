import {
  cartridgeModelControllerGetModels,
  decommissioningControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning =
  () => {
    return useApiMutation(decommissioningControllerCreate);
  };

//Нужно подумать о том, чтобы возвращались не все модели, а только те модели, которые в наличии на складе
export const useDecommissioningCartrdigeFormApiCartridgeModelGetAll = () => {
  return useApiQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
