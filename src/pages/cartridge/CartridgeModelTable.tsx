import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useCartridgeModelTableApi } from "./api/useCartridgeModelTableApi";
import { ActionsForTable } from "@/components/ActionsForTable";
import { DialogForm } from "@/components/DialogForm";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { Spinner } from "@/components/ui/spinner";

export function CartridgeModelTable() {
  const navigate = useNavigate();
  const { data, isSuccess, error } = useCartridgeModelTableApi();

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
      <DataTable
        data={data}
        columns={columns}
        titleTable="Список моделей картриджей"
        defaultSort="Модель"
        pageSize={12}
      >
        <DataTable.ToolbarActions>
          <ActionsForTable />
        </DataTable.ToolbarActions>
      </DataTable>
      <DialogForm
        key={"Создание модели картриджа"}
        title="Создание модели картриджа"
        name="create_model_cartridge"
      />
      ,
    </>
  ) : (
    <Spinner />
  );
}
