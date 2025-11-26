import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  PostCreateUserDto,
  roleControllerGetRoles,
  userControllerCreateUser,
} from "@/app/api/generated";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useRoleContext } from "@/app/providers/hooks/useRoleContext";
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
  const { roleName } = useRoleContext();

  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: roleName !== "staff",
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
