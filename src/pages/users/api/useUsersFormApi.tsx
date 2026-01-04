import { useChoiseOfKabinetsForCreateUser } from "@/shared/model";
import { useApiMutation, useApiSuspenseQuery } from "@/shared/api";
import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  roleControllerGetRoles,
  userControllerCreateUser,
  type PostCreateUserDto,
} from "@api/gen";

export const useUsersFormApiCreateUser = () => {
  return useApiMutation((data: PostCreateUserDto) =>
    userControllerCreateUser(data),
  );
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

export const useUsersFormApiGetKabinetsByUserIdForCreateUser = () => {
  const choiseDivision = useChoiseOfKabinetsForCreateUser(
    (state) => state.userChoices,
  );

  return useApiSuspenseQuery(
    () => {
      return kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(choiseDivision)),
      });
    },
    {
      queryKey: ["kabinetsByUserIdForCreateUser", choiseDivision],
    },
  );
};
