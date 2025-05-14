import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { useParams } from "react-router";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { DataTable } from "@/components/DataTable/DataTable";
import DialogForm from "@/components/DialogForm";
import { columns } from "./columns";

export function DivisionTable() {
  const { id } = useParams<{ id: string }>();
  const divisionId = parseInt(id!);
  const { kabinetsGetByDivisionId } = useIndexReactQuery(divisionId);

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
          form={<div />}
        />,
      ]}
    />
  ) : (
    <SpinnerLoad />
  );
}
