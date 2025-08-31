import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function useApiCartridgeDeliveryFrom(id: number) {
  const { cartrdgesCreateDelivery } = useIndexReactQuery(id);

  const { data: cartridgeModelData, isSuccess: cartridgeModelSuccess } =
    useIndexReactQuery().cartridgeModelGetAll;

  const { data: warehouseData, isSuccess: warehouseSuccess } =
    useIndexReactQuery(id).warehouseDetaildeByIdWithDivisionWithKabinets;

  const { data: staffData, isSuccess: staffSuccess } =
    useIndexReactQuery(id).staffGetAll;

  return {
    cartrdgesCreateDelivery,
    cartridgeModelData,
    cartridgeModelSuccess,
    warehouseData,
    warehouseSuccess,
    staffData,
    staffSuccess,
  };
}
