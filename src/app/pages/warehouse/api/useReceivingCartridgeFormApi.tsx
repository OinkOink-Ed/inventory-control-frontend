import {
  cartridgeModelControllerGetModels,
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

export const useReceivingCartridgeFormApiCreateCartridgeModelGetAll = () => {
  return useApiQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
