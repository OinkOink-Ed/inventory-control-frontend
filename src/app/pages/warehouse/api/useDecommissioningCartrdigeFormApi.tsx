import {
  cartridgeModelControllerGetModels,
  decommissioningControllerCreate,
} from "@/app/api/generated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useDecommissioningCartrdigeFormApiCartrdgesCreateDecommissioning =
  () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: decommissioningControllerCreate,
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["cartridges"],
        });
      },
    });
  };

export const useDecommissioningCartrdigeFormApiCartridgeModelGetAll = () => {
  return useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
