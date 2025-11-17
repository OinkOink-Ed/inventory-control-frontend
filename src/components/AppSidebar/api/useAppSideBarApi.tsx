import {
  divisionControllerGetDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useApiQuery } from "@/hooks/useApi";

export const useAppSideBarApiDivisionGetAll = () => {
  const profile = decryptedProfile();
  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled:
      (profile ? profile.role.roleName !== "staff" : profile) &&
      (profile ? profile.role.roleName !== "" : profile),
  });
};

export const useAppSideBarApiWarehouseGetAll = () => {
  const profile = decryptedProfile();
  return useApiQuery(warehouseControllerGetWarehouses, {
    queryKey: ["warehouses"],
    enabled:
      (profile ? profile.role.roleName !== "staff" : profile) &&
      (profile ? profile.role.roleName !== "" : profile),
  });
};
