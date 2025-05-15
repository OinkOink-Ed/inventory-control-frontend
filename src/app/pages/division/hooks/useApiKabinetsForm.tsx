import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiKabinetsForm(id: number) {
  const { kabinetCreate } = useIndexReactQuery(id);
  return {
    kabinetCreate,
  };
}
