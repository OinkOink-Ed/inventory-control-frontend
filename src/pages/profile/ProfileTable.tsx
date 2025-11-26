import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { useProfileCardTable } from "./api/useProfileCardFormApi";
import { GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";
import { useRoleContext } from "@/app/providers/hooks/useRoleContext";

export default function ProfileTable() {
  const { id } = useRoleContext();

  const { data, isSuccess } = useProfileCardTable(id ?? 0);

  return isSuccess && data ? (
    <DataTable<
      GetResponseAcceptedCartridgeByUserDtoMySchema,
      GetResponseAcceptedCartridgeByUserDtoMySchema
    >
      data={data?.flatMap((item) =>
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
