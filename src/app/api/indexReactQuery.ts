import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartridgeModelControllerCreate,
  cartridgeModelControllerGetAll,
  divisionControllerGetAll,
  roleControllerGetAll,
  userControllerCreateAdmin,
  userControllerCreateUser,
  userControllerGetAll,
  warehouseControllerGetAll,
} from "./generated";

export function useIndexReactQuery() {
  const queryClient = useQueryClient();

  // Получить модели картриджей
  const cartridgeModelGetAll = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetAll,
    staleTime: 5 * 60 * 1000,
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
    staleTime: 5 * 60 * 1000,
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
    staleTime: 5 * 60 * 1000,
    // refetchOnWindowFocus: false,
  });

  //Получить подразделения для выбора
  const divisionGetAll = useQuery({
    queryKey: ["divisions"],
    queryFn: divisionControllerGetAll,
    staleTime: 60 * 60 * 1000,
  });

  //Получить склады для выбора
  const warehouseGetAll = useQuery({
    queryKey: ["warehouses"],
    queryFn: warehouseControllerGetAll,
    staleTime: 60 * 60 * 1000,
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
  };
}
