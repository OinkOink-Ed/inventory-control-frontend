import {
  cartridgeModelControllerGetModels,
  receivingControllerCreate,
} from "@/app/api/generated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useReceivingCartridgeFormApiCartrdgesCreateReceiving = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: receivingControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridges"],
      });
    },
  });
};

export const useReceivingCartridgeFormApiCreateCartridgeModelGetAll = () => {
  return useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
