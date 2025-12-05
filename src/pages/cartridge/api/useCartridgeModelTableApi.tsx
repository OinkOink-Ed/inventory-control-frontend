import { useMatch } from "react-router";
import { useApiQuery } from "@/shared/api/hooks/useApi";
import { cartridgeModelControllerGetModelsAndTheirCreator } from "@api/gen";

export const useCartridgeModelTableApi = () => {
  return useApiQuery(cartridgeModelControllerGetModelsAndTheirCreator, {
    queryKey: ["modelsCartridgesDetailed"],
    enabled: !!useMatch({ path: "/cartrideModel", end: true }),
  });
};
