import { cartridgeModelControllerGetModelsAndTheirCreator } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useCartridgeModelTableApi = () => {
  return useQuery({
    queryKey: ["modelsCartridgesDetailed"],
    queryFn: cartridgeModelControllerGetModelsAndTheirCreator,
    enabled: !!useMatch({ path: "/cartrideModel", end: true }),
  });
};
