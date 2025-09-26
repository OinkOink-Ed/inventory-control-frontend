import { useNavigate, useParams } from "react-router";
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
import { useEffect } from "react";
import { Answer } from "@/app/Errors/Answer";
import { handlerError } from "@/app/helpers/handlerError";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useWarehouseTableApi } from "./api/useWarehouseTableApi";

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
    <DataTable<
      GetResponseAllCartridgeInWarehouseDtoSchema,
      GetResponseAllCartridgeInWarehouseDtoSchema
    >
      data={data.data}
      columns={columns}
      titleTable="Список картриджей"
      defaultSort="Поступление"
      column="Модель"
      facetedOptions={facetedCartridgeData}
      actions={
        <ActionsForTable
          actions={
            decryptedProfile().role.roleName === "admin"
              ? [
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
                    form={
                      <DecommissioningCartrdigeForm warehouseId={warehouseId} />
                    }
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
                ]
              : [
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
                    form={
                      <DecommissioningCartrdigeForm warehouseId={warehouseId} />
                    }
                  />,
                ]
          }
        />
      }
      pageSize={18}
    />
  ) : (
    <SpinnerLoad />
  );
}
