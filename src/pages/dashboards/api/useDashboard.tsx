import { useApiQuery } from "@/shared/api/hooks/useApi";
import { cartridgeControllerGetCartridgesCount } from "@api/gen";
import { useMatch } from "react-router";

export const useDashboardCartridgesCount = () => {
  return useApiQuery(cartridgeControllerGetCartridgesCount, {
    queryKey: ["dashboard"],
    enabled: !!useMatch({ path: "/dashboard", end: true }),
  });
};
