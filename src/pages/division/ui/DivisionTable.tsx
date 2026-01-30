import { useParams } from "react-router";
import { DataTable } from "@/shared/kit";
import { ActionsForTable } from "@/shared/kit";
import { DialogForm } from "@/shared/kit";
import { columns } from "@pages/division/model/columns";
import { KabinetsForm } from "@pages/division/ui/KabinetsForm";
import { useDivisionTableApi } from "@pages/division/api/useDivisionTableApi";

export function DivisionTable() {
  const { id } = useParams<{ id: string }>();
  const divisionId = id ? parseInt(id) : undefined;
  const { data } = useDivisionTableApi(divisionId);

  //Нужна общая проверка а не в каждом компоненте
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
  );
}
