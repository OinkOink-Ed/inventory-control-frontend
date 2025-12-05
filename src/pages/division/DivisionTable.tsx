import { useNavigate, useParams } from "react-router";
import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { useEffect } from "react";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useDivisionTableApi } from "./api/useDivisionTableApi";
import { KabinetsForm } from "./KabinetsForm";
import { DialogForm } from "@/components/DialogForm";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { Spinner } from "@/components/ui/spinner";

export function DivisionTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const divisionId = id ? parseInt(id) : undefined;
  const { error, data, isSuccess } = useDivisionTableApi(divisionId);

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
        titleTable="Список кабинетов"
        defaultSort="Номер"
        pageSize={12}
      >
        <DataTable.ToolbarActions>
          <ActionsForTable />
        </DataTable.ToolbarActions>
      </DataTable>
      <DialogForm
        title="Добавление кабинета"
        name="add_kabinet"
        key={"Добавление кабинета"}
      >
        <KabinetsForm divisionId={divisionId} />
      </DialogForm>
    </>
  ) : (
    <Spinner />
  );
}
