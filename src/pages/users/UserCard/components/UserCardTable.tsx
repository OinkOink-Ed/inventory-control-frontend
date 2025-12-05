import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { useUserCardTableProps } from "./api/useUserCardTableApi";
import { type GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";
import { Spinner } from "@/components/ui/spinner";

interface UserCardTableProps {
  id: number;
}

export default function UserCardtable({ id }: UserCardTableProps) {
  const { data, isSuccess } = useUserCardTableProps(id);

  return isSuccess ? (
    <DataTable<
      GetResponseAcceptedCartridgeByUserDtoMySchema,
      GetResponseAcceptedCartridgeByUserDtoMySchema
    >
      data={data.flatMap((item) =>
        item.acceptedCartridge.flatMap((item) => item)
      )}
      columns={columns}
      defaultSort="Подразделение"
      titleTable="Список полученных картриджей"
      pageSize={12}
    ></DataTable>
  ) : (
    <Spinner />
  );
}
