import { cartridgeControllerGetCartridgesCount } from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useDashboardCartridgesCount = () => {
  return useApiQuery({
    queryKey: ["dashboard"],
    queryFn: cartridgeControllerGetCartridgesCount,
    enabled: !!useMatch({ path: "/dashboard", end: true }),
  });
};
