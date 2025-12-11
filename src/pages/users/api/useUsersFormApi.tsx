import { useChoiseOfKabinetsForCreateUser } from "@/shared/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useApiMutation, useApiQuery } from "@/shared/api/hooks/useApi";
import { useMatch } from "react-router";
import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  roleControllerGetRoles,
  userControllerCreateUser,
  type PostCreateUserDto,
} from "@api/gen";
import { useProfileContext } from "@/shared/providers/ProfileProvider";

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
  const { role } = useProfileContext();

  return useApiQuery(divisionControllerGetDivisions, {
    queryKey: ["division"],
    enabled: role?.roleName !== "staff",
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
