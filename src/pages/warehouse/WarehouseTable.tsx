import { useNavigate, useParams } from "react-router";
import { useWarehouseTableApi } from "./api/useWarehouseTableApi";
import { useEffect } from "react";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { columns } from "./columns";
import { facetedCartridgeData } from "./facetedData";
import { DeliveryCartridgeForm } from "./DeliveryCartridgeForm";
import { DecommissioningCartrdigeForm } from "./DecommissioningCartrdigeForm";
import { ReceivingCartridgeForm } from "./ReceivingCartridgeForm";
import { MovementCartridgeForm } from "./MovementCartridgeForm";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/shared/kit/DataTable/DataTable";
import { ActionsForTable } from "@/shared/kit/ActionsForTable";
import { DialogForm } from "@/shared/kit/DialogForm";
import type { GetResponseAllCartridgeInWarehouseDtoSchema } from "@api/gen";

export function WarehouseTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const warehouseId = id ? parseInt(id, 10) : undefined;
  const { error, isSuccess, data } = useWarehouseTableApi(warehouseId);

  useEffect(() => {
    if (error) {
      const res = handlerError(error);
      setTimeout(() => {
        if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
    }
  }, [navigate, error]);

  return isSuccess ? (
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
  ) : (
    <Spinner />
  );
}
