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
import { useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useUsersFormApiCreateUser = () => {
  const queryClient = useQueryClient();
  return useApiMutation(
    (data: PostCreateUserDto) => userControllerCreateUser(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["users"],
        });
      },
    },
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

  const serializedDivisions = encodeURIComponent(
    JSON.stringify(choiseDivision),
  );

  return useApiQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", serializedDivisions],
    queryFn: () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: serializedDivisions,
      }),
    enabled: !!useMatch({ path: "/users/*" }) && !!choiseDivision,
  });
};
