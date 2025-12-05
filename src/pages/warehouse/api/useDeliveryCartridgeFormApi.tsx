import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useChoiceOfKabinetsStore } from "@/app/stores/choiseOfKabinets/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import {
  cartridgeModelControllerGetMogetModelsByWarehousedels,
  deliveryControllerCreate,
  divisionControllerGetDivision,
  kabinetControllerGetKabinetsByUserId,
  userControllerGetAllByDivisions,
} from "@api/gen";
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
    }
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
    (state) => state.warehouseChoices
  );

  const { id } = useParams<{ id: string }>();
  const match = useMatch({ path: "/warehouse/*" });
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
    }
  );
};

export const useDeliveryCartridgeFormApiKabinetsByUserId = () => {
  const choiseUser = useChoiceOfKabinetsStore((state) => state.userChoices);
  const match = useMatch({ path: "/warehouse/:id", end: true });
  return useApiQuery(
    () => {
      if (choiseUser) return kabinetControllerGetKabinetsByUserId(choiseUser);
      else throw new Error("choiseWarehouse - undefined");
    },
    {
      queryKey: ["kabinetsByUserId", choiseUser],
      enabled: !!match && !!choiseUser,
    }
  );
};
