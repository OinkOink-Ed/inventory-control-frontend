import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartridgeControllerGetCartridgesByWarehouse,
  cartridgeModelControllerCreate,
  cartridgeModelControllerGetModels,
  cartridgeModelControllerGetModelsAndTheirCreator,
  decommissioningControllerCreate,
  deliveryControllerCreate,
  divisionControllerGetDivisions,
  kabinetControllerCreate,
  kabinetControllerGetKAbinetsByDivisionId,
  movementControllerCreate,
  receivingControllerCreate,
  roleControllerGetRoles,
  userControllerCreateAdmin,
  userControllerCreateStaff,
  userControllerCreateUser,
  userControllerGetAll,
  userControllerGetAllByDivisions,
  userControllerGetCardUser,
  warehouseControllerGetCabinetsByWarehouse,
  warehouseControllerGetWarehouses,
} from "./generated";
import { useMatch } from "react-router";
import { decryptedProfile } from "../helpers/decryptedProfile";
import { useChoiceOfStaffStore } from "../stores/choiceOfStaff/useChoiceOfStaffStore";

export function useIndexReactQuery(id?: number) {
  const profile = decryptedProfile();
  const queryClient = useQueryClient();
  const choiseWarehouse = useChoiceOfStaffStore(
    (state) => state.warehouseChoices,
  );

  //Получить пользователей
  const userGetAll = useQuery({
    queryKey: ["users"],
    queryFn: userControllerGetAll,
    enabled: !!useMatch({ path: "/users", end: true }),
  });

  //Получить пользователей по складу
  const staffGetAllByDivisions = useQuery({
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

  // Получить склады для выбора
  const warehouseGetAll = useQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetWarehouses,
    enabled: profile.role.roleName !== "staff",
  });

  // Получить модели картриджей
  const cartridgeModelGetAll = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetModels,
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }),
  });

  //Получить роли пользователей
  const roleGetAll = useQuery({
    queryKey: ["roles"],
    queryFn: roleControllerGetRoles,
    enabled: !!useMatch({ path: "/users", end: true }),
  });

  //Получить подразделения для выбора
  const divisionGetAll = useQuery({
    queryKey: ["division"],
    queryFn: divisionControllerGetDivisions,
    enabled: profile.role.roleName !== "staff",
  });

  //Получить модели картриджей более подробно
  const cartridgeModelGetAllDetailed = useQuery({
    queryKey: ["modelsCartridgesDetailed"],
    queryFn: cartridgeModelControllerGetModelsAndTheirCreator,
    enabled: !!useMatch({ path: "/cartrideModel", end: true }),
  });

  // Создание модели картриджа
  const cartridgeModelCreate = useMutation({
    mutationFn: cartridgeModelControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridgesDetailed"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridges"],
      });
    },
  });

  //Создать пользователя
  const userCreateUser = useMutation({
    mutationFn: userControllerCreateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // Создать Администратора
  const userCreateAdmin = useMutation({
    mutationFn: userControllerCreateAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  // Создать Кабинет
  const kabinetCreate = useMutation({
    mutationFn: kabinetControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["kabinets", id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["warehousewithDivisionWithKabinets"],
      });
    },
  });

  // Создать сотрудника
  const staffCreate = useMutation({
    mutationFn: userControllerCreateStaff,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });

  //Получить кабинеты по подразделению
  const kabinetsGetByDivisionId = useQuery({
    queryKey: ["kabinets", id],
    queryFn: () => kabinetControllerGetKAbinetsByDivisionId(id!),
    enabled: !!useMatch({ path: "/division/:id", end: true }) && !!id,
  });

  //Получить картриджи по складу
  const cartridgesGetByWarehouseId = useQuery({
    queryKey: ["cartridges", id],
    queryFn: () => cartridgeControllerGetCartridgesByWarehouse(id!),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });

  //Получить склад по id + подразделение в нем + кабинеты в нем
  const warehouseDetaildeByIdWithDivisionWithKabinets = useQuery({
    queryKey: ["warehousewithDivisionWithKabinets", id],
    queryFn: () => warehouseControllerGetCabinetsByWarehouse(id!),
    enabled: !!useMatch({ path: "/warehouse/:id", end: true }) && !!id,
  });

  //Получить полученные сотрудником
  const cartridgeAcceptedByStaffId = useQuery({
    queryKey: ["cartridgeAcceptedByStaffId", id],
    queryFn: () => userControllerGetCardUser(id!),
    enabled: !!useMatch({ path: "/users/:id", end: true }) && !!id,
  });

  //Создать акт приема поставки картриджей
  const cartrdgesCreateReceiving = useMutation({
    mutationFn: receivingControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridges"],
      });
    },
  });

  //Создать акт списания  картриджей
  const cartrdgesCreateDecommissioning = useMutation({
    mutationFn: decommissioningControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridges"],
      });
    },
  });

  //Создать акт перемещения картриджей
  const cartrdgesCreateMovement = useMutation({
    mutationFn: movementControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridges"],
      });
    },
  });

  //Создать акт выдачи картриджей
  const cartrdgesCreateDelivery = useMutation({
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

  return {
    roleGetAll,
    cartridgeModelCreate,
    userCreateAdmin,
    userCreateUser,
    userGetAll,
    cartridgeModelGetAll,
    divisionGetAll,
    warehouseGetAll,
    kabinetsGetByDivisionId,
    cartridgesGetByWarehouseId,
    cartridgeModelGetAllDetailed,
    cartrdgesCreateReceiving,
    cartrdgesCreateDecommissioning,
    cartrdgesCreateMovement,
    cartrdgesCreateDelivery,
    warehouseDetaildeByIdWithDivisionWithKabinets,
    kabinetCreate,
    staffGetAllByDivisions,
    staffCreate,
    cartridgeAcceptedByStaffId,
    queryClient,
  };
}
