import { useApiSuspenseQuery } from "@/shared/api";
import { cartridgeControllerGetCartridgesCount } from "@api/gen";

export const useDashboardCartridgesCount = () => {
  return useApiSuspenseQuery(cartridgeControllerGetCartridgesCount, {
    queryKey: ["dashboard"],
  });
};
