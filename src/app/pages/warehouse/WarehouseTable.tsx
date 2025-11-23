import { useNavigate, useParams } from "react-router";
import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { facetedCartridgeData } from "./facetedData";
import { ReceivingCartridgeForm } from "./ReceivingCartridgeForm";
import { MovementCartridgeForm } from "./MovementCartridgeForm";
import { DecommissioningCartrdigeForm } from "./DecommissioningCartrdigeForm";
import { DeliveryCartridgeForm } from "./DeliveryCartridgeForm";
import { GetResponseAllCartridgeInWarehouseDtoSchema } from "@/app/api/generated";
import { useEffect } from "react";
import { Answer } from "@/app/Errors/Answer";
import { handlerError } from "@/app/helpers/handlerError";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useWarehouseTableApi } from "./api/useWarehouseTableApi";
import { DialogForm } from "@/components/DialogForm";

export function WarehouseTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const warehouseId = parseInt(id!);
  const { error, isSuccess, data } = useWarehouseTableApi(warehouseId);

  useEffect(() => {
    if (error) {
      const res = handlerError(error);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
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
    <SpinnerLoad />
  );
}
