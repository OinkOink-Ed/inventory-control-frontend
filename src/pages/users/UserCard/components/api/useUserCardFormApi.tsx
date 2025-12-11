import { useChoiseOfKabinetsForCreateUser } from "@/shared/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useProfileContext } from "@/shared/providers/ProfileProvider";
import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  roleControllerGetRoles,
  userControllerEditUser,
  type PutEditUserDto,
} from "@api/gen";

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
  const { role } = useProfileContext();

  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: role?.roleName !== "staff",
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
