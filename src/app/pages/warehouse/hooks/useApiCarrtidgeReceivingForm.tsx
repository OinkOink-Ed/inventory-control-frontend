import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiCartidgeReceivingForm(id: number) {
  const { cartrdgesCreateReceiving } = useIndexReactQuery(id);
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useIndexReactQuery().cartridgeModelGetAll;

  return {
    cartrdgesCreateReceiving,
    cartridgeModelData,
    cartridgeModelSuccess,
  };
}
