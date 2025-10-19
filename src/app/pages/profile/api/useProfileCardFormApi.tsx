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
import { useMatch } from "react-router";

export const useProfileCardFormApi = () => {
  return useApiMutation((data: PutEditUserDto) =>
    userControllerEditProfile(data),
  );
};

export const useProfileCardApi = () => {
  return useApiQuery({
    queryKey: ["profileCard"],
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

  return useApiQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", userChoices],
    queryFn: () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(userChoices)),
      }),
    enabled: !!useMatch({ path: "/profile/", end: true }) && !!userChoices,
  });
};

export const useProfileCardTable = (id: number) => {
  return useApiQuery({
    queryKey: ["accepted-cartridge", id],
    queryFn: userControllerGetCardProfileAcceptedCartridge,
    enabled: !!useMatch({ path: "/profile/" }),
  });
};
