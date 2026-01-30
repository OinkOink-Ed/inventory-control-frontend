import { useApiSuspenseQuery } from "@/shared/api";
import { cartridgeModelControllerGetModelsAndTheirCreator } from "@api/gen";

export const useCartridgeModelTableApi = () => {
  return useApiSuspenseQuery(cartridgeModelControllerGetModelsAndTheirCreator, {
    queryKey: ["modelsCartridgesDetailed"],
  });
};
