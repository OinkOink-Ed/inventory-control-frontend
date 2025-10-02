import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  PutEditUserDto,
  roleControllerGetRoles,
  userControllerEditProfile,
  userControllerGetCardProfileAcceptedCartridge,
  userControllerGetProfileCard,
} from "@/app/api/generated";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useProfileCardFormApi = (id: number) => {
  const queryClient = useQueryClient();
  return useApiMutation(
    (data: PutEditUserDto) => userControllerEditProfile(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["cartridgeAcceptedByStaffId", id],
        });
      },
    },
  );
};

export const useProfileCardApi = () => {
  return useApiQuery({
    queryKey: ["cartridgeAcceptedByStaffId"],
    queryFn: userControllerGetProfileCard,
    enabled: !!useMatch({ path: "/profile/", end: true }),
  });
};

export const useUsersFormApiGetRole = () => {
  return useApiQuery({
    queryKey: ["roles"],
    queryFn: roleControllerGetRoles,
    enabled: !!useMatch({ path: "/profile/", end: true }),
  });
};

export const useUsersFormApiGetDivision = () => {
  return useApiQuery({
    queryKey: ["division"],
    queryFn: divisionControllerGetDivisions,
    enabled: !!useMatch({ path: "/profile/", end: true }),
  });
};
//Надо бы сделать для edit отдельный контроллер на сервее и тут использовать как метод
export const useUsersFormApiGetKabinetsByUserIdForEditUser = () => {
  const { userChoices } = useChoiseOfKabinetsForCreateUser();

  const serializedDivisions = encodeURIComponent(JSON.stringify(userChoices));

  return useApiQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", serializedDivisions],
    queryFn: () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: serializedDivisions,
      }),
    enabled: !!useMatch({ path: "/profile/", end: true }) && !!userChoices,
  });
};

export const useProfileCardTable = () => {
  return useApiQuery({
    queryKey: ["accepted-cartridge"],
    queryFn: userControllerGetCardProfileAcceptedCartridge,
    enabled: !!useMatch({ path: "/profile/" }),
  });
};
