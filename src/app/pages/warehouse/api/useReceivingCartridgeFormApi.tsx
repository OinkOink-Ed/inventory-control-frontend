import {
  cartridgeModelControllerGetModels,
  PostCreateReceivingDto,
  receivingControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useReceivingCartridgeFormApiCartrdgesCreateReceiving = () => {
  const queryClient = useQueryClient();

  return useApiMutation(
    (data: PostCreateReceivingDto) => receivingControllerCreate(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["cartridges"],
        });
      },
    },
  );
};

export const useReceivingCartridgeFormApiCreateCartridgeModelGetAll = () => {
  return useApiQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
