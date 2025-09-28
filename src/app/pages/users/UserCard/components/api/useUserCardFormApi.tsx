import {
  divisionControllerGetDivisions,
  kabinetControllerGetKabinetsByDivisionIdForCreateUser,
  PutEditUserDto,
  roleControllerGetRoles,
  userControllerEditUser,
} from "@/app/api/generated";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { useChoiseOfKabinetsForCreateUser } from "@/app/stores/choiseOfKabinetsForCreateUser/useChoiseOfKabinetsStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useUserCardFormApi = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PutEditUserDto) => userControllerEditUser(id, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cartridgeAcceptedByStaffId", id],
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

export const useUsersFormApiGetKabinetsByUserIdForEditUser = () => {
  const { userChoices } = useChoiseOfKabinetsForCreateUser();

  const serializedDivisions = encodeURIComponent(JSON.stringify(userChoices));

  return useQuery({
    queryKey: ["kabinetsByUserIdForCreateUser", serializedDivisions],
    queryFn: () =>
      kabinetControllerGetKabinetsByDivisionIdForCreateUser({
        divisionIds: serializedDivisions,
      }),
    enabled: !!useMatch({ path: "/users/*" }) && !!userChoices,
  });
};
