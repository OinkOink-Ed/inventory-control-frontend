import {
  cartridgeModelControllerGetModels,
  decommissioningControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning =
  () => {
    const queryClient = useQueryClient();
    return useApiMutation(decommissioningControllerCreate, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["cartridges"],
        });
      },
    });
  };

export const useDecommissioningCartrdigeFormApiCartridgeModelGetAll = () => {
  return useApiQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
