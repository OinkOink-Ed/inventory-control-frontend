import { useChoiseOfKabinetsForCreateUser } from "@/shared/model";
import { useApiMutation, useApiSuspenseQuery } from "@/shared/api";
import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  roleControllerGetRoles,
  userControllerEditProfile,
  userControllerGetCardProfileAcceptedCartridge,
  userControllerGetProfileCard,
  type PutEditUserDto,
} from "@api/gen";

export const useProfileCardFormApi = () => {
  return useApiMutation((data: PutEditUserDto) =>
    userControllerEditProfile(data),
  );
};

export const useProfileCardApi = () => {
  return useApiSuspenseQuery(userControllerGetProfileCard, {
    queryKey: ["profileCard"],
  });
};

export const useUsersFormApiGetRole = () => {
  return useApiSuspenseQuery(roleControllerGetRoles, {
    queryKey: ["roles"],
  });
};

export const useUsersFormApiGetDivision = () => {
  return useApiSuspenseQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
  });
};

//Надо бы сделать для edit отдельный контроллер на сервере и тут использовать как метод
export const useUsersFormApiGetKabinetsByUserIdForEditUser = () => {
  const { userChoices } = useChoiseOfKabinetsForCreateUser();

  return useApiSuspenseQuery(
    () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(userChoices)),
      }),
    {
      queryKey: ["kabinetsByUserIdForCreateUser", userChoices],
    },
  );
};

export const useProfileCardTable = (id: number | false) => {
  return useApiSuspenseQuery(userControllerGetCardProfileAcceptedCartridge, {
    queryKey: ["accepted-cartridge", id],
  });
};
