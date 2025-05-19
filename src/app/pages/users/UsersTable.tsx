import { columns } from "./columns";
import { DataTable } from "../../../components/DataTable/DataTable";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import DialogForm from "@/components/DialogForm";
import { UserForm } from "./UserForm";
import { facetedUsersData } from "./facetedData";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";

export function UsersTable() {
  const { data, isSuccess, error } = useIndexReactQuery().userGetAll;
  const navigate = useNavigate();

  if (error) {
    const res = handlerError(error);
    if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
  }

  return isSuccess ? (
    <DataTable
      data={data.data}
      columns={columns}
      titleTable="Список пользователей"
      defaultSort="ФИО"
      facetedOptions={facetedUsersData}
      dialog={[
        <DialogForm
          key={"Создание пользователя"}
          title="Создание пользователя"
          buttonName="Создать пользователя"
          form={<UserForm />}
        />,
      ]}
    />
  ) : (
    <SpinnerLoad />
  );
}
