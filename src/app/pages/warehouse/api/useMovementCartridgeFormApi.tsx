import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  movementControllerCreate,
  PostCreateMovementDto,
  userControllerGetAllByDivisions,
  warehouseControllerGetWarehouses,
} from "@/app/api/generated";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useRoleContext } from "@/app/providers/hooks/useRoleContext";
import { useMatch, useParams } from "react-router";

export const useMovementCartridgeFormApiCartrdgesCreateMovement = () => {
  return useApiMutation((data: PostCreateMovementDto) =>
    movementControllerCreate(data),
  );
};
export const useMovementCartridgeFormApiCartridgeModelGetAll = () => {
  const { id } = useParams<{ id: string }>();
  return useApiQuery(
    () => cartridgeModelControllerGetMogetModelsByWarehousedels(Number(id)),
    {
      queryKey: ["modelsCartridges"],
      enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
    },
  );
};
export const useMovementCartridgeFormApiWarehouseGetAll = () => {
  const { roleName } = useRoleContext();
  return useApiQuery(warehouseControllerGetWarehouses, {
    queryKey: ["warehouses"],
    enabled: roleName !== "staff",
  });
};

export const useMovementCartridgeFormApiStaffGetAllByDivisions = () => {
  const choiseWarehouse = useChoiceOfStaffStore(
    (state) => state.warehouseChoices,
  );
  const match = useMatch({ path: "/warehouse/*" });
  const { id } = useParams<{ id: string }>();

  return useApiQuery(
    () => {
      if (id) {
        return userControllerGetAllByDivisions(Number(id));
      }
      return userControllerGetAllByDivisions(choiseWarehouse!);
    },
    {
      queryKey: ["usersByWarehouse", choiseWarehouse, id],
      enabled: !!match && (!!choiseWarehouse || !!id),
    },
  );
};
