import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartridgeControllerGetCartridgesById,
  cartridgeModelControllerCreate,
  cartridgeModelControllerGetAll,
  cartridgeModelControllerGetAllDetailed,
  decommissioningControllerCreate,
  deliveryControllerCreate,
  divisionControllerGetAll,
  kabinetControllerGetKAbinetsByDivisionId,
  movementControllerCreate,
  receivingControllerCreate,
  roleControllerGetAll,
  userControllerCreateAdmin,
  userControllerCreateUser,
  userControllerGetAll,
  warehouseControllerGetAll,
  warehouseControllerGetDetailedByWarehouseId,
} from "./generated";

export function useIndexReactQuery(id?: number) {
  const queryClient = useQueryClient();

  //Получить пользователей
  const userGetAll = useQuery({
    queryKey: ["users"],
    queryFn: userControllerGetAll,
  });

  // Получить склады для выбора
  const warehouseGetAll = useQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetAll,
  });

  // Получить модели картриджей
  const cartridgeModelGetAll = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetAll,
  });

  //Получить роли пользователей
  const roleGetAll = useQuery({
    queryKey: ["roles"],
    queryFn: roleControllerGetAll,
  });

  //Получить подразделения для выбора
  const divisionGetAll = useQuery({
    queryKey: ["division"],
    queryFn: divisionControllerGetAll,
  });

  //Получить модели картриджей более подробно
  const cartridgeModelGetAllDetailed = useQuery({
    queryKey: ["modelsCartridgesDetailed"],
    queryFn: cartridgeModelControllerGetAllDetailed,
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

  //Получить кабинеты по подразделению
  const kabinetsGetByDivisionId = useQuery({
    queryKey: [`kabinets${id}`],
    queryFn: () => kabinetControllerGetKAbinetsByDivisionId(id!),
    enabled: !!id,
  });

  //Получить картриджи по складу
  const cartridgesGetByWarehouseId = useQuery({
    queryKey: [`cartridges${id}`],
    queryFn: () => cartridgeControllerGetCartridgesById(id!),
    enabled: !!id,
  });

  //Получить склад по id + подразделение в нем + кабинеты в нем
  const warehouseDetaildeByIdWithDivisionWithKabinets = useQuery({
    queryKey: [`warehouse${id}withDivisionWithKabinets`],
    queryFn: () => warehouseControllerGetDetailedByWarehouseId(id!),
    enabled: !!id,
  });

  //Создать акт приема поставки картриджей
  const cartrdgesCreateReceiving = useMutation({
    mutationFn: receivingControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`cartridges${id}`],
      });
    },
  });

  //Создать акт списания  картриджей
  const cartrdgesCreateDecommissioning = useMutation({
    mutationFn: decommissioningControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`cartridges${id}`],
      });
    },
  });

  //Создать акт перемещения картриджей
  const cartrdgesCreateMovement = useMutation({
    mutationFn: movementControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`cartridges${id}`],
      });
    },
  });

  //Создать акт выдачи картриджей
  const cartrdgesCreateDelivery = useMutation({
    mutationFn: deliveryControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [`cartridges${id}`],
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
  };
}
