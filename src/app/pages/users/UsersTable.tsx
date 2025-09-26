import { columns } from "./columns";
import { DataTable } from "../../../components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { UserForm } from "./UserForm";
import { facetedUsersData } from "./facetedData";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useUsersTableApi } from "./api/useUsersTableApi";

export function UsersTable() {
  const { data, isSuccess, error } = useUsersTableApi();
  const navigate = useNavigate();

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
      titleTable="Список пользователей"
      defaultSort="ФИО"
      facetedOptions={facetedUsersData}
      actions={
        <ActionsForTable
          actions={[
            <DialogForm
              key={"Создание пользователя"}
              title="Создание пользователя"
              buttonName="Создать пользователя"
              form={<UserForm />}
            />,
          ]}
        />
      }
      pageSize={12}
    />
  ) : (
    <SpinnerLoad />
  );
}
