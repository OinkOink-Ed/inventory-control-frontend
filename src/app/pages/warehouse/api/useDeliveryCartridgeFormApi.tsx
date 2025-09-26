import {
  cartridgeModelControllerGetModels,
  deliveryControllerCreate,
  divisionControllerGetDivision,
  kabinetControllerGetKabinetsByUserId,
  userControllerGetAllByDivisions,
} from "@/app/api/generated";
import { useChoiceOfStaffStore } from "@/app/stores/choiceOfStaff/useChoiceOfStaffStore";
import { useChoiceOfKabinetsStore } from "@/app/stores/choiseOfKabinets/useChoiseOfKabinetsStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useDeliveryCartridgeFormApiCartrdgesCreateDelivery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deliveryControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridges"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["cartridgeAcceptedByStaffId"],
      });
    },
  });
};

export const useDeliveryCartridgeFormApiCartridgeModelGetAll = () => {
  return useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });
};

export const useDeliveryCartridgeFormApiDivisionIdByWarehouseId = (
  id: number,
) => {
  return useQuery({
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

export const useDeliveryCartridgeFormApiKabinetsByUserId = () => {
  const choiseUser = useChoiceOfKabinetsStore((state) => state.userChoices);
  return useQuery({
    queryKey: ["kabinetsByUserId", choiseUser],
    queryFn: () => kabinetControllerGetKabinetsByUserId(choiseUser!),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!choiseUser,
  });
};
