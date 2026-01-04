import { ActionsForTable } from "@/shared/kit";
import { DialogForm } from "@/shared/kit";
import { DataTable } from "@/shared/kit/index";
import { useUsersTableApi } from "@pages/users/api/useUsersTableApi.tsx";
import { columns } from "@pages/users/model/columns";
import { facetedUsersData } from "@pages/users/model/facetedData";
import { UserForm } from "@pages/users/ui/UserForm";

export function UsersTable() {
  const { data } = useUsersTableApi();
  // const navigate = useNavigate();

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
        titleTable="Список пользователей"
        defaultSort="ФИО"
        facetedOptions={facetedUsersData}
        pageSize={12}
      >
        <DataTable.ToolbarActions>
          <ActionsForTable />
        </DataTable.ToolbarActions>
      </DataTable>
      <DialogForm
        key={"Создание пользователя"}
        title="Создание пользователя"
        name="create_user"
      >
        <UserForm />
      </DialogForm>
      ,
    </>
  );
}
