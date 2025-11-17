import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  PostCreateUserDto,
  roleControllerGetRoles,
  userControllerCreateUser,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/hooks/useApi";
import { useMatch } from "react-router";

export const useUsersFormApiCreateUser = () => {
  return useApiMutation((data: PostCreateUserDto) =>
    userControllerCreateUser(data),
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

export const useUsersFormApiGetKabinetsByUserIdForCreateUser = () => {
  const choiseDivision = useChoiseOfKabinetsForCreateUser(
    (state) => state.userChoices,
  );

  return useApiQuery(
    () => {
      return kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(choiseDivision)),
      });
    },
    {
      queryKey: ["kabinetsByUserIdForCreateUser", choiseDivision],
      enabled: !!useMatch({ path: "/users/*" }) && !!choiseDivision,
    },
  );
};
