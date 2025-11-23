import {
  divisionControllerGetDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { useApiQuery } from "@/hooks/useApi";
import { useRoleContext } from "@/app/providers/hooks/useRoleContext";

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
