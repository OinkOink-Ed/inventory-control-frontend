import { columns } from "./columns";
import { UserForm } from "./UserForm";
import { facetedUsersData } from "./facetedData";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ActionsForTable } from "@/shared/kit/ActionsForTable";
import { useUsersTableApi } from "./api/useUsersTableApi";
import { DialogForm } from "@/shared/kit/DialogForm";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";
import { DataTable } from "@/shared/kit/DataTable/DataTable";
import { Spinner } from "@/components/ui/spinner";

export function UsersTable() {
  const { data, isSuccess, error } = useUsersTableApi();
  const navigate = useNavigate();

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
  ) : (
    <Spinner />
  );
}
