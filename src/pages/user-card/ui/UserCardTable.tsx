import { DataTable } from "@/shared/kit/index";
import { columns } from "../model/columns";
import type { GetResponseAcceptedCartridgeByUserDtoMySchema } from "@pages/user-card/model/validation/shema.ts";
import { useUserCardTableProps } from "@pages/user-card/api/useUserCardTableApi";

interface UserCardTableProps {
  id: number;
}

export default function UserCardTable({ id }: UserCardTableProps) {
  const { data } = useUserCardTableProps(id);

  return (
    <DataTable<
      GetResponseAcceptedCartridgeByUserDtoMySchema,
      GetResponseAcceptedCartridgeByUserDtoMySchema
    >
      data={data.flatMap((item) =>
        item.acceptedCartridge.flatMap((item) => item),
      )}
      columns={columns}
      defaultSort="Подразделение"
      titleTable="Список полученных картриджей"
      pageSize={12}
    ></DataTable>
  );
}
