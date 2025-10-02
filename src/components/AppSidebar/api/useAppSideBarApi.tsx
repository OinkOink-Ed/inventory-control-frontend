import {
  divisionControllerGetDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useApiQuery } from "@/hooks/useApi";

export const useAppSideBarApiDivisionGetAll = () => {
  const profile = decryptedProfile();
  return useApiQuery({
    queryKey: ["division"],
    queryFn: divisionControllerGetDivisions,
    enabled: profile.role.roleName !== "staff" && profile.role.roleName !== "",
  });
};

export const useAppSideBarApiWarehouseGetAll = () => {
  const profile = decryptedProfile();
  return useApiQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetWarehouses,
    enabled: profile.role.roleName !== "staff" && profile.role.roleName !== "",
  });
};
