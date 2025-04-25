import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cartridgeModelControllerCreate,
  cartridgeModelControllerGetAll,
  roleControllerGetAll,
  userControllerCreateAdmin,
  userControllerCreateUser,
  userControllerGetAll,
} from "./generated";

export function useIndexReactQuery() {
  const queryClient = useQueryClient();

  //Получить модели картриджей
  const getModelCartridges = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: cartridgeModelControllerGetAll,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      return data.data.map((item) => ({
        ...item,
      }));
    },
  });

  //Создание модели картриджа
  const createModelCartridge = useMutation({
    mutationFn: cartridgeModelControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridges"],
      });
    },
  });

  //Получить пользователей
  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: userControllerGetAll,
    staleTime: 5 * 60 * 1000,
  });

  //Создать пользователя
  const createUser = useMutation({
    mutationFn: userControllerCreateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  //Создать Администратор
  const createAdmin = useMutation({
    mutationFn: userControllerCreateAdmin,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  //Получить роли пользователей
  const getUserRoles = useQuery({
    queryKey: ["roles"],
    queryFn: roleControllerGetAll,
    staleTime: 5 * 60 * 1000,
  });

  return {
    getModelCartridges,
    createModelCartridge,
    getUsers,
    createUser,
    getUserRoles,
    createAdmin,
  };
}
