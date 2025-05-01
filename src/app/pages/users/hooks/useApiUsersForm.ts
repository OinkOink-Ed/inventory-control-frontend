import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiUsersForm() {
  const { mutateAsync } = useIndexReactQuery().userCreateUser;
  const { data: roleData, isSuccess: RoleSuccess } =
    useIndexReactQuery().roleGetAll;
  const { data: divisionData, isSuccess: divisionSuccess } =
    useIndexReactQuery().divisionGetAll;

  return { mutateAsync, roleData, RoleSuccess, divisionData, divisionSuccess };
}
