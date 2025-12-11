import { useApiQuery } from "@/shared/api/hooks/useApi";
import { useRoleContext } from "@app-providers/ProfileProvider/context";
import {
  divisionControllerGetDivisions,
  warehouseControllerGetWarehouses,
} from "@api/gen";

export const useAppSideBarApiDivisionGetAll = () => {
  const { roleName } = useRoleContext();
  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: roleName !== "staff",
  });
};

export const useAppSideBarApiWarehouseGetAll = () => {
  const { roleName } = useRoleContext();
  return useApiQuery(warehouseControllerGetWarehouses, {
    queryKey: ["warehouses"],
    enabled: roleName !== "staff",
  });
};
