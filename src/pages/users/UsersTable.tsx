import { columns } from "./columns";
import { DataTable } from "../../../components/DataTable/DataTable";
import { UserForm } from "./UserForm";
import { facetedUsersData } from "./facetedData";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { handlerError } from "@/app/helpers/handlerError";
import { Answer } from "@/app/Errors/Answer";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { ActionsForTable } from "@/components/ActionsForTable";
import { useUsersTableApi } from "./api/useUsersTableApi";
import { Button } from "@/components/ui/Button/Button";
import { DialogForm } from "@/components/DialogForm";

export function UsersTable() {
  const { data, isSuccess, error } = useUsersTableApi();
  const navigate = useNavigate();
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
        titleTable="Список пользователей"
        defaultSort="ФИО"
        facetedOptions={facetedUsersData}
        actions={
          <ActionsForTable
            actions={[
              <Button
                key={"Создание пользователя"}
                variant={"outline"}
                className="w-full border-none"
                onClick={() => setShowAddKabinet(true)}
              >
                Создать пользователя
              </Button>,
            ]}
          />
        }
        pageSize={12}
      />
      <DialogForm
        openState={showAddKabinet}
        changeState={setShowAddKabinet}
        key={"Создание пользователя"}
        title="Создание пользователя"
        form={<UserForm />}
      />
      ,
    </>
  ) : (
    <SpinnerLoad />
  );
}
