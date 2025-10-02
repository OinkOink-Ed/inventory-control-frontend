import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { CartridgeModelForm } from "./CartridgeModelForm";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useCartridgeModelTableApi } from "./api/useCartridgeModelTableApi";
import { ActionsForTable } from "@/components/ActionsForTable";
import { Button } from "@/components/ui/Button/Button";
import { DialogForm } from "@/components/DialogForm";

export function CartridgeModelTable() {
  const navigate = useNavigate();
  const { data, isSuccess, error } = useCartridgeModelTableApi();
  const [showAddKabinet, setShowAddKabinet] = useState(false);

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
      <DataTable
        data={data}
        columns={columns}
        titleTable="Список моделей картриджей"
        defaultSort="Модель"
        actions={[
          <ActionsForTable
            key={"Действия моделей картриджей"}
            actions={[
              <Button
                key={"Добавление моделей картриджей"}
                variant={"outline"}
                className="w-full border-none"
                onClick={() => setShowAddKabinet(true)}
              >
                Добавить модель
              </Button>,
            ]}
          ></ActionsForTable>,
        ]}
        pageSize={12}
      />
      <DialogForm
        openState={showAddKabinet}
        key={"Создание модели картриджа"}
        title="Создание модели картриджа"
        form={<CartridgeModelForm />}
        changeState={setShowAddKabinet}
      />
      ,
    </>
  ) : (
    <SpinnerLoad />
  );
}
