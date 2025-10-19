import {
  cartridgeModelControllerGetModels,
  deliveryControllerCreate,
  divisionControllerGetDivision,
  kabinetControllerGetKabinetsByUserId,
  userControllerGetAllByDivisions,
} from "@/app/api/generated";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useChoiceOfKabinetsStore } from "@/app/stores/choiseOfKabinets/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useDeliveryCartridgeFormApiCartrdgesCreateDelivery = () => {
  return useApiMutation(deliveryControllerCreate);
};

export const useDeliveryCartridgeFormApiCartridgeModelGetAll = () => {
  return useApiQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};

export const useDeliveryCartridgeFormApiDivisionIdByWarehouseId = (
  id: number,
) => {
  return useApiQuery({
    queryKey: ["divisionIdByWarehouseId", id],
    queryFn: () => divisionControllerGetDivision(id),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });
};

export const useDeliveryCartridgeFormApiStaffGetAllByDivisions = (
  id: number,
) => {
  const choiseWarehouse = useChoiceOfStaffStore(
    (state) => state.warehouseChoices,
  );
  return useApiQuery({
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

export const useDeliveryCartridgeFormApiKabinetsByUserId = () => {
  const choiseUser = useChoiceOfKabinetsStore((state) => state.userChoices);
  return useApiQuery({
    queryKey: ["kabinetsByUserId", choiseUser],
    queryFn: () => kabinetControllerGetKabinetsByUserId(choiseUser!),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!choiseUser,
  });
};
