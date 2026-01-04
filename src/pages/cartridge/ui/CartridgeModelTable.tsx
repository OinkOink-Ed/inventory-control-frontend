import { DataTable } from "@/shared/kit";
import { ActionsForTable } from "@/shared/kit";
import { DialogForm } from "@/shared/kit";
import { useCartridgeModelTableApi } from "@pages/cartridge/api/useCartridgeModelTableApi";
import { columns } from "@pages/cartridge/model/columns";

export function CartridgeModelTable() {
  const { data } = useCartridgeModelTableApi();

  //Это решало вопрос с невалидным рефреш токеном, но нужен более общий подход
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
  );
}
