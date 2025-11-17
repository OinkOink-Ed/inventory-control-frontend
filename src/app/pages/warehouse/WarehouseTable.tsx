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
import { useEffect, useState } from "react";
import { Answer } from "@/app/Errors/Answer";
import { handlerError } from "@/app/helpers/handlerError";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useWarehouseTableApi } from "./api/useWarehouseTableApi";
import { Button } from "@/components/ui/Button/Button";
import { DialogForm } from "@/components/DialogForm";

export function WarehouseTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const warehouseId = parseInt(id!);
  const { error, isSuccess, data } = useWarehouseTableApi(warehouseId);
  const [showDelivery, setShowDelivery] = useState(false);
  const [showDecommissioning, setShowDecommissioning] = useState(false);
  const [showReceiving, setShowReceiving] = useState(false);
  const [showMovement, setShowMovement] = useState(false);
  const user = decryptedProfile();

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
        actions={
          <ActionsForTable
            actions={
              (user ? user.role.roleName === "admin" : user)
                ? [
                    <Button
                      key={"Выдача картриджей"}
                      variant={"outline"}
                      className="w-full border-none"
                      onClick={() => setShowDelivery(true)}
                    >
                      Выдать картриджи
                    </Button>,
                    <Button
                      key={"Списание картриджей"}
                      variant={"outline"}
                      className="w-full border-none"
                      onClick={() => setShowDecommissioning(true)}
                    >
                      Списать картриджи
                    </Button>,
                    <Button
                      key={"Приём картриджей"}
                      variant={"outline"}
                      className="w-full border-none"
                      onClick={() => setShowReceiving(true)}
                    >
                      Принять картриджи
                    </Button>,
                    <Button
                      key={"Перемещение картриджей"}
                      variant={"outline"}
                      className="w-full border-none"
                      onClick={() => setShowMovement(true)}
                    >
                      Переместить картриджи
                    </Button>,
                  ]
                : [
                    <Button
                      key={"Выдача картриджей"}
                      variant={"outline"}
                      className="w-full border-none"
                      onClick={() => setShowDelivery(true)}
                    >
                      Выдать картриджи
                    </Button>,
                    <Button
                      key={"Списание картриджей"}
                      variant={"outline"}
                      className="w-full border-none"
                      onClick={() => setShowDecommissioning(true)}
                    >
                      Списать картриджи
                    </Button>,
                  ]
            }
          />
        }
        pageSize={18}
      />
      {(user ? user.role.roleName === "admin" : user) ? (
        <>
          <DialogForm
            openState={showDelivery}
            changeState={setShowDelivery}
            key={"Выдача картриджей"}
            title="Выдача картриджей"
            form={<DeliveryCartridgeForm warehouseId={warehouseId} />}
          />

          <DialogForm
            openState={showDecommissioning}
            changeState={setShowDecommissioning}
            key={"Списание картриджей"}
            title="Списание картриджей"
            form={<DecommissioningCartrdigeForm warehouseId={warehouseId} />}
          />

          <DialogForm
            openState={showReceiving}
            changeState={setShowReceiving}
            key={"Приём картриджей"}
            title="Приём картриджей"
            form={<ReceivingCartridgeForm warehouseId={warehouseId} />}
          />

          <DialogForm
            openState={showMovement}
            changeState={setShowMovement}
            key={"Перемещение картриджей"}
            title="Перемещение картриджей"
            form={<MovementCartridgeForm warehouseId={warehouseId} />}
          />
        </>
      ) : (
        <>
          <DialogForm
            openState={showDelivery}
            changeState={setShowDelivery}
            key={"Выдача картриджей"}
            title="Выдача картриджей"
            form={<DeliveryCartridgeForm warehouseId={warehouseId} />}
          />

          <DialogForm
            openState={showDecommissioning}
            changeState={setShowDecommissioning}
            key={"Списание картриджей"}
            title="Списание картриджей"
            form={<DecommissioningCartrdigeForm warehouseId={warehouseId} />}
          />
        </>
      )}
    </>
  ) : (
    <SpinnerLoad />
  );
}
