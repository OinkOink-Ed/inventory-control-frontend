import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartridgeControllerGetCartridgesById,
  cartridgeModelControllerCreate,
  cartridgeModelControllerGetAll,
  divisionControllerGetAll,
  kabinetControllerGetKAbinetsByDivisionId,
  roleControllerGetAll,
  userControllerCreateAdmin,
  userControllerCreateUser,
  userControllerGetAll,
  warehouseControllerGetAll,
} from "./generated";

export function useIndexReactQuery(id?: number) {
  const queryClient = useQueryClient();

  // Получить модели картриджей
  const cartridgeModelGetAll = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetAll,
  });

  // Создание модели картриджа
  const cartridgeModelCreate = useMutation({
    mutationFn: cartridgeModelControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridges"],
      });
    },
  });

  //Получить пользователей
  const userGetAll = useQuery({
    queryKey: ["users"],
    queryFn: userControllerGetAll,
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

  //Получить кабинеты по подразделению
  const kabinetsGetByDivisionId = useQuery({
    queryKey: [`kabinets${id}`],
    queryFn: () => kabinetControllerGetKAbinetsByDivisionId(id!),
    enabled: !!id,
  });

  //Получить склады для выбора
  const warehouseGetAll = useQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetAll,
  });

  //Получить картриджи по складу
  const cartridgesGetByWarehouseId = useQuery({
    queryKey: [`cartridges${id}`],
    queryFn: () => cartridgeControllerGetCartridgesById(id!),
    enabled: !!id,
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
  };
}
