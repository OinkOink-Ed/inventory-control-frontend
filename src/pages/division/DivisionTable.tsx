import { useNavigate, useParams } from "react-router";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useEffect, useState } from "react";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useDivisionTableApi } from "./api/useDivisionTableApi";
import { Button } from "@/components/ui/Button/Button";
import { KabinetsForm } from "./KabinetsForm";
import { DialogForm } from "@/components/DialogForm";

export function DivisionTable() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const divisionId = parseInt(id!);
  const { error, data, isSuccess } = useDivisionTableApi(divisionId);
  const [showAddKabinet, setShowAddKabinet] = useState(false);

  useEffect(() => {
    if (error) {
      const res = handlerError(error);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
    }
  }, [navigate, error]);

  return isSuccess ? (
    <>
      <DataTable
        data={data}
        columns={columns}
        titleTable="Список кабинетов"
        defaultSort="Номер"
        actions={[
          <ActionsForTable
            key={"Действия подразделений"}
            actions={[
              <Button
                key={"Добавление кабинета"}
                variant={"outline"}
                className="w-full border-none"
                onClick={() => setShowAddKabinet(true)}
              >
                Добавить кабинет
              </Button>,
            ]}
          ></ActionsForTable>,
        ]}
        pageSize={12}
      />
      <DialogForm
        title="Добавление кабинета"
        form={<KabinetsForm divisionId={divisionId} />}
        openState={showAddKabinet}
        changeState={setShowAddKabinet}
      />
    </>
  ) : (
    <SpinnerLoad />
  );
}
