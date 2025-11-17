import {
  cartridgeModelControllerGetModels,
  movementControllerCreate,
  PostCreateMovementDto,
  userControllerGetAllByDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useMovementCartridgeFormApiCartrdgesCreateMovement = () => {
  return useApiMutation((data: PostCreateMovementDto) =>
    movementControllerCreate(data),
  );
};
export const useMovementCartridgeFormApiCartridgeModelGetAll = () => {
  return useApiQuery(cartridgeModelControllerGetModels, {
    queryKey: ["modelsCartridges"],
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
export const useMovementCartridgeFormApiWarehouseGetAll = () => {
  const profile = decryptedProfile();
  return useApiQuery(warehouseControllerGetWarehouses, {
    queryKey: ["warehouses"],
    enabled: profile ? profile.role.roleName !== "staff" : profile,
  });
};

export const useMovementCartridgeFormApiStaffGetAllByDivisions = (
  id: number,
) => {
  const choiseWarehouse = useChoiceOfStaffStore(
    (state) => state.warehouseChoices,
  );

  return useApiQuery(
    () => {
      if (id) {
        return userControllerGetAllByDivisions(id);
      }
      return userControllerGetAllByDivisions(choiseWarehouse!);
    },
    {
      queryKey: ["usersByWarehouse", choiseWarehouse, id],
      enabled:
        !!useMatch({ path: "/warehouse/*" }) && (!!choiseWarehouse || !!id),
    },
  );
};
