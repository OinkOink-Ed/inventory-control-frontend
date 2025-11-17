import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  PutEditUserDto,
  roleControllerGetRoles,
  userControllerEditUser,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";

export const useUserCardFormApi = (id: number) => {
  return useApiMutation((data: PutEditUserDto) =>
    userControllerEditUser(id, data),
  );
};

export const useUsersFormApiGetRole = () => {
  return useApiQuery(roleControllerGetRoles, {
    queryKey: ["roles"],
  });
};

export const useUsersFormApiGetDivision = () => {
  const profile = decryptedProfile();

  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: profile ? profile.role.roleName !== "staff" : profile,
  });
};

export const useUsersFormApiGetKabinetsByUserIdForEditUser = () => {
  const { userChoices } = useChoiseOfKabinetsForCreateUser();

  return useApiQuery(
    () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(userChoices)),
      }),
    {
      queryKey: ["kabinetsByUserIdForCreateUser", userChoices],
      enabled: !!userChoices,
    },
  );
};
