import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { useParams } from "react-router";
import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { facetedCartridgeData } from "./facetedData";
import { ReceivingCartridgeForm } from "./ReceivingCartridgeForm";
import { MovementCartridgeForm } from "./MovementCartridgeForm";
import { DecommissioningCartrdigeForm } from "./DecommissioningCartrdigeForm";
import { DeliveryCartridgeForm } from "./DeliveryCartridgeForm";
import { GetResponseAllCartridgeInWarehouseDtoSchema } from "@/app/api/generated";

export function WarehouseTable() {
  const { id } = useParams<{ id: string }>();
  const warehouseId = parseInt(id!);
  const { cartridgesGetByWarehouseId } = useIndexReactQuery(warehouseId);

  return cartridgesGetByWarehouseId.isSuccess ? (
    <DataTable<
      GetResponseAllCartridgeInWarehouseDtoSchema,
      GetResponseAllCartridgeInWarehouseDtoSchema
    >
      data={cartridgesGetByWarehouseId.data.data}
      columns={columns}
      titleTable="Список картриджей"
      defaultSort="Поступление"
      column="Модель"
      facetedOptions={facetedCartridgeData}
      dialog={[
        <DialogForm
          key={"Выдача картриджей"}
          title="Выдача картриджей"
          buttonName="Выдать картриджи"
          form={<DeliveryCartridgeForm warehouseId={warehouseId} />}
        />,
        <DialogForm
          key={"Списание картриджей"}
          title="Списание картриджей"
          buttonName="Списать картриджи"
          form={<DecommissioningCartrdigeForm warehouseId={warehouseId} />}
        />,
        <DialogForm
          key={"Приём картриджей"}
          title="Приём картриджей"
          buttonName="Принять картриджи"
          form={<ReceivingCartridgeForm warehouseId={warehouseId} />}
        />,
        <DialogForm
          key={"Перемещение картриджей"}
          title="Перемещение картриджей"
          buttonName="Переместить картриджи"
          form={<MovementCartridgeForm warehouseId={warehouseId} />}
        />,
      ]}
    />
  ) : (
    <SpinnerLoad />
  );
}
