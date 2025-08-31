import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { Answer } from "@/app/Errors/Answer";
import { handlerError } from "@/app/helpers/handlerError";
import { DataTable } from "@/components/DataTable/DataTable";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { columns } from "./columns";
import { GetResponseStaffDetailedShemaOfTable } from "./shema";

export function UserCard() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const staffId = parseInt(id!);

  const { data, isSuccess, error } =
    useIndexReactQuery(staffId).cartridgeAcceptedByStaffId;

  useEffect(() => {
    if (error) {
      const res = handlerError(error);
      console.log(res);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
      console.log(error);
    }
  }, [navigate, error]);

  //Над таблицей нужны ещё данные уже из объекта
  return isSuccess ? (
    <DataTable<
      GetResponseStaffDetailedShemaOfTable,
      GetResponseStaffDetailedShemaOfTable
    >
      data={data?.data?.flatMap((row) =>
        row.acceptedCartridge.flatMap((item) => ({
          ...item,
        })),
      )}
      columns={columns}
      defaultSort="ФИО"
      titleTable="Список полученных картриджей"
    ></DataTable>
  ) : (
    <SpinnerLoad />
  );
}
