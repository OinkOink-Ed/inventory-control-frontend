import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { useParams } from "react-router";
import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { facetedCartridgeData } from "./facetedData";

export function WarehouseTable() {
  const { id } = useParams<{ id: string }>();
  const warehouseId = parseInt(id!);
  const { cartridgesGetByWarehouseId } = useIndexReactQuery(warehouseId);

  return cartridgesGetByWarehouseId.isSuccess ? (
    <DataTable
      data={cartridgesGetByWarehouseId.data.data}
      columns={columns}
      titleTable="Список картриджей"
      defaultSort="Модель"
      facetedOptions={facetedCartridgeData}
      dialog={
        <DialogForm
          title="Выдача картриджей?"
          buttonName="Выдать картриджи?"
          form={<div />}
        />
      }
    />
  ) : (
    <SpinnerLoad />
  );
}
