import {
  cartridgeModelControllerGetModels,
  movementControllerCreate,
  userControllerGetAllByDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useMovementCartridgeFormApiCartrdgesCreateMovement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: movementControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridges"],
      });
    },
  });
};
export const useMovementCartridgeFormApiCartridgeModelGetAll = () => {
  return useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};
export const useMovementCartridgeFormApiWarehouseGetAll = () => {
  const profile = decryptedProfile();
  return useQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetWarehouses,
    enabled: profile.role.roleName !== "staff",
  });
};
export const useMovementCartridgeFormApiStaffGetAllByDivisions = (
  id: number,
) => {
  const choiseWarehouse = useChoiceOfStaffStore(
    (state) => state.warehouseChoices,
  );

  return useQuery({
    queryKey: ["usersByWarehouse", choiseWarehouse, id],
    queryFn: () => {
      if (id) {
        return userControllerGetAllByDivisions(id);
      }
      return userControllerGetAllByDivisions(choiseWarehouse!);
    },
    enabled:
      !!useMatch({ path: "/warehouse/*" }) && (!!choiseWarehouse || !!id),
  });
};
