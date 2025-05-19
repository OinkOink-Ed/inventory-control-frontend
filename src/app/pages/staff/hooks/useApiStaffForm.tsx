import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiStaffForm() {
  const { mutateAsync } = useIndexReactQuery().staffCreate;

  return { mutateAsync };
}
