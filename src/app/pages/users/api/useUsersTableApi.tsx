import { userControllerGetAll } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router";

export const useUsersTableApi = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userControllerGetAll,
    enabled: !!useMatch({ path: "/users", end: true }),
  });
};
