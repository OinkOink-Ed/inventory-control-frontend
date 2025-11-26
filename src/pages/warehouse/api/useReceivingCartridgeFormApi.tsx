import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  PostCreateReceivingDto,
  receivingControllerCreate,
} from "@/app/api/generated";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useMatch, useParams } from "react-router";

export const useReceivingCartridgeFormApiCartrdgesCreateReceiving = () => {
  return useApiMutation((data: PostCreateReceivingDto) =>
    receivingControllerCreate(data),
  );
};

export const useReceivingCartridgeFormApiCreateCartridgeModelGetAll = () => {
  const { id } = useParams<{ id: string }>();

  return useApiQuery(
    () => cartridgeModelControllerGetMogetModelsByWarehousedels(Number(id)),
    {
      queryKey: ["modelsCartridges"],
      enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
    },
  );
};
