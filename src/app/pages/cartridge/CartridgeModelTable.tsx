import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";
import { CartridgeModelForm } from "./CartridgeModelForm";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCartridgeModelTableApi } from "./api/useCartridgeModelTableApi";
import { ActionsForTable } from "@/components/ActionsForTable";

export function CartridgeModelTable() {
  const navigate = useNavigate();
  const { data, isSuccess, error } = useCartridgeModelTableApi();

  useEffect(() => {
    if (error) {
      const res = handlerError(error);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
    }
  }, [navigate, error]);

  return isSuccess ? (
    <DataTable
      data={data.data}
      columns={columns}
      titleTable="Список моделей картриджей"
      defaultSort="Модель"
      actions={[
        <ActionsForTable
          key={"Действия моделей картриджей"}
          actions={[
            <DialogForm
              key={"Создание модели картриджа"}
              title="Создание модели картриджа"
              buttonName="Добавить модель картриджа"
              form={<CartridgeModelForm />}
            />,
          ]}
        ></ActionsForTable>,
      ]}
      pageSize={12}
    />
  ) : (
    <SpinnerLoad />
  );
}
