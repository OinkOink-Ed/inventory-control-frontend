import { cartridgeModelControllerGetModelsAndTheirCreator } from "@/app/api/generated";
import { useMatch } from "react-router";
import { useApiQuery } from "@/hooks/useApi";

export const useCartridgeModelTableApi = () => {
  return useApiQuery({
    queryKey: ["modelsCartridgesDetailed"],
    queryFn: cartridgeModelControllerGetModelsAndTheirCreator,
    enabled: !!useMatch({ path: "/cartrideModel", end: true }),
  });
};
