import { cartridgeModelControllerGetModelsAndTheirCreator } from "@/app/api/generated";
import { useMatch } from "react-router";
import { useApiQuery } from "@/shared/api/hooks/useApi";

export const useCartridgeModelTableApi = () => {
  return useApiQuery(cartridgeModelControllerGetModelsAndTheirCreator, {
    queryKey: ["modelsCartridgesDetailed"],
    enabled: !!useMatch({ path: "/cartrideModel", end: true }),
  });
};
