import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useRoleContext } from "@app-providers/RoleProvider/hooks/useRoleContext";
import { useMatch, useParams } from "react-router";
import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  movementControllerCreate,
  userControllerGetAllByDivisions,
  warehouseControllerGetWarehouses,
  type PostCreateMovementDto,
} from "@api/gen";

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
      if (choiseWarehouse)
        return userControllerGetAllByDivisions(choiseWarehouse);
      else throw new Error("choiseWarehouse - undefined");
    },
    {
      queryKey: ["usersByWarehouse", choiseWarehouse, id],
      enabled: !!match && (!!choiseWarehouse || !!id),
    },
  );
};
