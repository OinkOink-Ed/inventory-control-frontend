import { useNavigate, useParams } from "react-router";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";
import { KabinetsForm } from "./KabinetsForm";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useEffect } from "react";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useDivisionTableApi } from "./api/useDivisionTableApi";

export function DivisionTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const divisionId = parseInt(id!);
  const { error, data, isSuccess } = useDivisionTableApi(divisionId);

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
      titleTable="Список кабинетов"
      defaultSort="Номер"
      actions={[
        <ActionsForTable
          key={"Действия подразделений"}
          actions={[
            <DialogForm
              key={"Добавление кабинета"}
              title="Добавление кабинета"
              buttonName="Добавить кабинет"
              form={<KabinetsForm divisionId={divisionId} />}
            />,
          ]}
        ></ActionsForTable>,
      ]}
      pageSize={12}
    />
  ) : (
    <SpinnerLoad />
  );
}
