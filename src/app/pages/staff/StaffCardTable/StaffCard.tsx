import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { Answer } from "@/app/Errors/Answer";
import { handlerError } from "@/app/helpers/handlerError";
import { DataTable } from "@/components/DataTable/DataTable";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { GetResponseDetailedStaffByIdSchema } from "@/app/api/generated";
import { columns } from "./columns";

export function StaffCard() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const staffId = parseInt(id!);

  const { data, isSuccess, error } =
    useIndexReactQuery(staffId).cartridgeAcceptedByStaffId;

  useEffect(() => {
    if (error) {
      const res = handlerError(error);
      setTimeout(() => {
        if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
      }, 1000);
      console.log(error);
    }
  }, [navigate, error]);

  console.log(data?.data);

  return isSuccess ? (
    <DataTable<
      GetResponseDetailedStaffByIdSchema,
      GetResponseDetailedStaffByIdSchema
    >
      data={data?.data}
      columns={columns}
      defaultSort="ФИО"
      titleTable="Список полученных картриджей"
    ></DataTable>
  ) : (
    <SpinnerLoad />
  );
}
