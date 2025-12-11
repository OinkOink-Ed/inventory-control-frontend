import { DataTable } from "@/shared/kit/DataTable/DataTable";
import { columns } from "./columns";
import { useProfileCardTable } from "./api/useProfileCardFormApi";
import { type GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";
import { useRoleContext } from "@app-providers/ProfileProvider/context";
import { Spinner } from "@/components/ui/spinner";

export default function ProfileTable() {
  const { id } = useRoleContext();

  const { data, isSuccess } = useProfileCardTable(id ?? 0);

  return isSuccess ? (
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
  ) : (
    <Spinner />
  );
}
