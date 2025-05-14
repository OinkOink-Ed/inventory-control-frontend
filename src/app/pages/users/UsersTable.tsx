import { columns } from "./columns";
import { DataTable } from "../../../components/DataTable/DataTable";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import DialogForm from "@/components/DialogForm";
import { UserForm } from "./UserForm";
import { facetedUsersData } from "./facetedData";
import { SpinnerLoad } from "@/components/SpinnerLoad";

export function UsersTable() {
  const { data, isSuccess } = useIndexReactQuery().userGetAll;

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
