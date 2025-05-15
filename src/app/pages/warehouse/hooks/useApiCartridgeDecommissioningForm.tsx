import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiCartridgeDecommissioningForm(id: number) {
  const { cartrdgesCreateDecommissioning } = useIndexReactQuery(id);
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useIndexReactQuery().cartridgeModelGetAll;

  return {
    cartrdgesCreateDecommissioning,
    cartridgeModelData,
    cartridgeModelSuccess,
  };
}
