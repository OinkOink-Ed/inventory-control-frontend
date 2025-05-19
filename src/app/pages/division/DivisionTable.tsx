import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { useNavigate, useParams } from "react-router";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";
import { KabinetsForm } from "./KabinetsForm";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useEffect } from "react";

export function DivisionTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const divisionId = parseInt(id!);
  const { kabinetsGetByDivisionId } = useIndexReactQuery(divisionId);

  useEffect(() => {
    if (kabinetsGetByDivisionId.error) {
      const res = handlerError(kabinetsGetByDivisionId.error);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
    }
  }, [navigate, kabinetsGetByDivisionId.error]);

  return kabinetsGetByDivisionId.isSuccess ? (
    <DataTable
      data={kabinetsGetByDivisionId.data.data}
      columns={columns}
      titleTable="Список кабинетов"
      defaultSort="Номер"
      dialog={[
        <DialogForm
          key={"Добавление кабинета"}
          title="Добавление кабинета"
          buttonName="Добавить кабинет"
          form={<KabinetsForm divisionId={divisionId} />}
        />,
      ]}
    />
  ) : (
    <SpinnerLoad />
  );
}
