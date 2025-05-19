import { DataTable } from "../../../components/DataTable/DataTable";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import DialogForm from "@/components/DialogForm";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { StaffForm } from "./StaffForm";
import { columns } from "./columns";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";

export function StaffTable() {
  const navigate = useNavigate();
  const { data, isSuccess, error } = useIndexReactQuery().staffGetAll;

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
      titleTable="Список сотрудников"
      defaultSort="ФИО"
      dialog={[
        <DialogForm
          key={"Создание сотрудника"}
          title="Создание сотрудника"
          buttonName="Создать сотрудника"
          form={<StaffForm />}
        />,
      ]}
    />
  ) : (
    <SpinnerLoad />
  );
}
