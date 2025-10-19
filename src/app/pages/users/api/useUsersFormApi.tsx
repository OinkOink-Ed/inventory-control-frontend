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

export const useUsersFormApiGetKabinetsByUserIdForCreateUser = () => {
  const choiseDivision = useChoiseOfKabinetsForCreateUser(
    (state) => state.userChoices,
  );

  return useApiQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", choiseDivision],
    queryFn: () => {
      return kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: encodeURIComponent(JSON.stringify(choiseDivision)),
      });
    },
    enabled: !!useMatch({ path: "/users/*" }) && !!choiseDivision,
  });
};
