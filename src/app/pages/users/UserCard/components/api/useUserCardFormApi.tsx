import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  PutEditUserDto,
  roleControllerGetRoles,
  userControllerEditUser,
} from "@/app/api/generated";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useRoleContext } from "@/app/providers/hooks/useRoleContext";

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
  const { roleName } = useRoleContext();

  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: roleName !== "staff",
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
