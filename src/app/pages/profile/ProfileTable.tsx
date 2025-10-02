import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { useProfileCardTable } from "./api/useProfileCardFormApi";
import { GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";

export default function ProfileTable() {
  const { data, isSuccess } = useProfileCardTable();

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
