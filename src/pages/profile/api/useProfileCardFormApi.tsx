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
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useMatch } from "react-router";

export const useProfileCardFormApi = () => {
  return useApiMutation((data: PutEditUserDto) =>
    userControllerEditProfile(data),
  );
};

export const useProfileCardApi = () => {
  return useApiQuery(userControllerGetProfileCard, {
    queryKey: ["profileCard"],
    enabled: !!useMatch({ path: "/profile/", end: true }),
  });
};

export const useUsersFormApiGetRole = () => {
  return useApiQuery(roleControllerGetRoles, {
    queryKey: ["roles"],
    enabled: !!useMatch({ path: "/profile/", end: true }),
  });
};

export const useUsersFormApiGetDivision = () => {
  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: !!useMatch({ path: "/profile/", end: true }),
  });
};

//Надо бы сделать для edit отдельный контроллер на сервере и тут использовать как метод
export const useUsersFormApiGetKabinetsByUserIdForEditUser = () => {
  const { userChoices } = useChoiseOfKabinetsForCreateUser();

  return useApiQuery(
    () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(userChoices)),
      }),
    {
      queryKey: ["kabinetsByUserIdForCreateUser", userChoices],
      enabled: !!useMatch({ path: "/profile/", end: true }) && !!userChoices,
    },
  );
};

export const useProfileCardTable = (id: number | false) => {
  return useApiQuery(userControllerGetCardProfileAcceptedCartridge, {
    queryKey: ["accepted-cartridge", id],
    enabled: !!useMatch({ path: "/profile/" }) && !!id,
  });
};
