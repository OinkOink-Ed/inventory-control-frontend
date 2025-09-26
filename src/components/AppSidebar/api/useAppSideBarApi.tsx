import {
  divisionControllerGetDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useQuery } from "@tanstack/react-query";

export const useAppSideBarApiDivisionGetAll = () => {
  const profile = decryptedProfile();
  return useQuery({
    queryKey: ["division"],
    queryFn: divisionControllerGetDivisions,
    enabled: profile.role.roleName !== "staff",
  });
};

export const useAppSideBarApiWarehouseGetAll = () => {
  const profile = decryptedProfile();
  return useQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetWarehouses,
    enabled: profile.role.roleName !== "staff",
  });
};
