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
  return useApiQuery({
    queryKey: ["roles"],
    queryFn: roleControllerGetRoles,
  });
};

export const useUsersFormApiGetDivision = () => {
  const profile = decryptedProfile();

  return useApiQuery({
    queryKey: ["division"],
    queryFn: divisionControllerGetDivisions,
    enabled: profile.role.roleName !== "staff",
  });
};

export const useUsersFormApiGetKabinetsByUserIdForEditUser = () => {
  const { userChoices } = useChoiseOfKabinetsForCreateUser();

  return useApiQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", userChoices],
    queryFn: () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(userChoices)),
      }),
    enabled: !!userChoices,
  });
};
