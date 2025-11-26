import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  deliveryControllerCreate,
  divisionControllerGetDivision,
  kabinetControllerGetKabinetsByUserId,
  userControllerGetAllByDivisions,
} from "@/app/api/generated";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useChoiceOfKabinetsStore } from "@/app/stores/choiseOfKabinets/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useMatch, useParams } from "react-router";

export const useDeliveryCartridgeFormApiCartrdgesCreateDelivery = () => {
  return useApiMutation(deliveryControllerCreate);
};

export const useDeliveryCartridgeFormApiCartridgeModelGetAll = () => {
  const { id } = useParams<{ id: string }>();
  const match = useMatch({ path: "/warehouse/:id", end: true });
  return useApiQuery(
    () => cartridgeModelControllerGetMogetModelsByWarehousedels(Number(id)),
    {
      queryKey: ["modelsCartridges"],
      enabled: !!match,
    },
  );
};

export const useDeliveryCartridgeFormApiDivisionIdByWarehouseId = () => {
  const { id } = useParams<{ id: string }>();
  const match = useMatch({ path: "/warehouse/:id", end: true });
  return useApiQuery(() => divisionControllerGetDivision(Number(id)), {
    queryKey: ["divisionIdByWarehouseId", id],
    enabled: !!match && !!id,
  });
};

export const useDeliveryCartridgeFormApiStaffGetAllByDivisions = () => {
  const choiseWarehouse = useChoiceOfStaffStore(
    (state) => state.warehouseChoices,
  );

  const { id } = useParams<{ id: string }>();
  const match = useMatch({ path: "/warehouse/*" });
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

export const useDeliveryCartridgeFormApiKabinetsByUserId = () => {
  const choiseUser = useChoiceOfKabinetsStore((state) => state.userChoices);
  const match = useMatch({ path: "/warehouse/:id", end: true });
  return useApiQuery(() => kabinetControllerGetKabinetsByUserId(choiseUser!), {
    queryKey: ["kabinetsByUserId", choiseUser],
    enabled: !!match && !!choiseUser,
  });
};
