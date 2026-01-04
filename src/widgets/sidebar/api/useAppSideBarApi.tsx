import { useProfileContext } from "@/shared/providers/index.ts";
import {
  divisionControllerGetDivisions,
  warehouseControllerGetWarehouses,
} from "@api/gen";
import { useApiQuery } from "@api/index";

export const useAppSideBarApiDivisionGetAll = () => {
  const { roleName } = useProfileContext();
  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: roleName !== "staff",
  });
};

export const useAppSideBarApiWarehouseGetAll = () => {
  const { roleName } = useProfileContext();
  return useApiQuery(warehouseControllerGetWarehouses, {
    queryKey: ["warehouses"],
    enabled: roleName !== "staff",
  });
};
