import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiCartridgeMovementForm(id: number) {
  const { cartrdgesCreateMovement } = useIndexReactQuery(id);
  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useIndexReactQuery().cartridgeModelGetAll;

  const { data: warehouseData, isSuccess: warehouseSuccess } =
    useIndexReactQuery().warehouseGetAll;

  return {
    cartrdgesCreateMovement,
    cartridgeModelData,
    cartridgeModelSuccess,
    warehouseData,
    warehouseSuccess,
  };
}
