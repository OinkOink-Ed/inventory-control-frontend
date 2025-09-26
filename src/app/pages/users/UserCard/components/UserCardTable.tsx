import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { useUserCardTableProps } from "./api/useUserCardTableApi";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";
import { useEffect } from "react";

interface UserCardTableProps {
  id: number;
}

export default function UserCardtable({ id }: UserCardTableProps) {
  const { data, isSuccess } = useUserCardTableProps(id);

  useEffect(() => {
    console.log(isSuccess);
    console.log(data);
  });

  return isSuccess && data ? (
    <DataTable<
      GetResponseAcceptedCartridgeByUserDtoMySchema,
      GetResponseAcceptedCartridgeByUserDtoMySchema
    >
      data={data?.data.flatMap((item) =>
        item.acceptedCartridge.flatMap((item) => item),
      )}
      columns={columns}
      defaultSort="Подразделение"
      titleTable="Список полученных картриджей"
      pageSize={12}
    ></DataTable>
  ) : (
    <SpinnerLoad />
  );
}
