import { useParams } from "react-router";
import { DataTable } from "@/shared/kit";
import { ActionsForTable } from "@/shared/kit";
import type { GetResponseAllCartridgeInWarehouseDtoSchema } from "@api/gen";
import { DialogForm } from "@/kit/index";
import { useWarehouseTableApi } from "@pages/warehouse/api/useWarehouseTableApi";
import { columns } from "@pages/warehouse/model/columns.tsx";
import { facetedCartridgeData } from "@pages/warehouse/model/facetedData.tsx";
import { DeliveryCartridgeForm } from "@pages/warehouse/ui/DeliveryCartridgeForm";
import { DecommissioningCartrdigeForm } from "@pages/warehouse/ui/DecommissioningCartrdigeForm";
import { ReceivingCartridgeForm } from "@pages/warehouse/ui/ReceivingCartridgeForm";
import { MovementCartridgeForm } from "@pages/warehouse/ui/MovementCartridgeForm";

export function WarehouseTable() {
  const { id } = useParams<{ id: string }>();
  const warehouseId = id ? parseInt(id, 10) : undefined;
  const { data } = useWarehouseTableApi(warehouseId);

  // useEffect(() => {
  //   if (error) {
  //     const res = handlerError(error);
  //     setTimeout(() => {
  //       if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
  //     }, 1000);
  //   }
  // }, [navigate, error]);

  return (
    <>
      <DataTable<
        GetResponseAllCartridgeInWarehouseDtoSchema,
        GetResponseAllCartridgeInWarehouseDtoSchema
      >
        data={data}
        columns={columns}
        titleTable="Список картриджей"
        defaultSort="Поступление"
        column="Модель"
        facetedOptions={facetedCartridgeData}
        pageSize={18}
      >
        <DataTable.ToolbarActions>
          <ActionsForTable />
        </DataTable.ToolbarActions>
      </DataTable>
      <DialogForm
        key={"Выдача картриджей"}
        title="Выдача картриджей"
        name="delivery"
      >
        <DeliveryCartridgeForm />
      </DialogForm>

      <DialogForm
        key={"Списание картриджей"}
        title="Списание картриджей"
        name="decommissioning"
      >
        <DecommissioningCartrdigeForm />
      </DialogForm>

      <DialogForm
        key={"Приём картриджей"}
        title="Приём картриджей"
        name="receiving"
      >
        <ReceivingCartridgeForm />
      </DialogForm>

      <DialogForm
        key={"Перемещение картриджей"}
        title="Перемещение картриджей"
        name="movement"
      >
        <MovementCartridgeForm />
      </DialogForm>
    </>
  );
}
