import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  modelCartridgesControllerCreate,
  modelCartridgesControllerGetAll,
  usersControllerCreate,
  usersControllerGetAll,
} from "./generated";
import { formateDate } from "../helpers/formateDate";

export function useIndexReactQuery() {
  const queryClient = useQueryClient();

  //Получить модели картриджей
  const getModelCartridges = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: modelCartridgesControllerGetAll,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      return data.data.map((item) => ({
        ...item,
        createdAt: formateDate(item.createdAt),
        updatedAt: formateDate(item.updatedAt),
      }));
    },
  });

  //Создание модели картриджа
  const createModelCartridge = useMutation({
    mutationFn: modelCartridgesControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["modelsCartridges"],
      });
    },
  });

  //Получить пользователей
  const getUsers = useQuery({
    queryKey: ["users"],
    queryFn: usersControllerGetAll,
    staleTime: 5 * 60 * 1000,
  });

  //Создать пользователя
  const createuser = useMutation({
    mutationFn: usersControllerCreate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    getModelCartridges,
    createModelCartridge,
    getUsers,
    createuser,
  };
}
