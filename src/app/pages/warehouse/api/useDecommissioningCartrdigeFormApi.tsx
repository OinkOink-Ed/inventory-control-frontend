import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  decommissioningControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useMatch, useParams } from "react-router";

export const useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning =
  () => {
    return useApiMutation(decommissioningControllerCreate);
  };

export const useDecommissioningCartrdigeFormApiCartridgeModelGetAll = () => {
  const { id } = useParams<{ id: string }>();
  return useApiQuery(
    () => cartridgeModelControllerGetMogetModelsByWarehousedels(Number(id)),
    {
      queryKey: ["modelsCartridges"],
      enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
    },
  );
};
