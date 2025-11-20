import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
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

export const useDeliveryCartridgeFormApiCartridgeModelGetAll = (
  warehouseId: number,
) => {
  return useApiQuery(
    () => cartridgeModelControllerGetMogetModelsByWarehousedels(warehouseId),
    {
      queryKey: ["modelsCartridges"],
      enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
    },
  );
};

export const useDeliveryCartridgeFormApiDivisionIdByWarehouseId = (
  id: number,
) => {
  return useApiQuery(() => divisionControllerGetDivision(id), {
    queryKey: ["divisionIdByWarehouseId", id],
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });
};

export const useDeliveryCartridgeFormApiStaffGetAllByDivisions = (
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

export const useDeliveryCartridgeFormApiKabinetsByUserId = () => {
  const choiseUser = useChoiceOfKabinetsStore((state) => state.userChoices);
  return useApiQuery(() => kabinetControllerGetKabinetsByUserId(choiseUser!), {
    queryKey: ["kabinetsByUserId", choiseUser],
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!choiseUser,
  });
};
