import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  roleControllerGetRoles,
  userControllerCreateUser,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useUsersFormApiCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userControllerCreateUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUsersFormApiGetRole = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleControllerGetRoles,
    enabled: !!useMatch({ path: "/users/*" }),
  });
};

export const useUsersFormApiGetDivision = () => {
  const profile = decryptedProfile();

  return useQuery({
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

  return useQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", serializedDivisions],
    queryFn: () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: serializedDivisions,
      }),
    enabled: !!useMatch({ path: "/users/*" }) && !!choiseDivision,
  });
};
