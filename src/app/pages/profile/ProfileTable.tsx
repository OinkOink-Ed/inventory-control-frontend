import { DataTable } from "@/components/DataTable/DataTable";
import { columns } from "./columns";
import { SpinnerLoad } from "@/components/SpinnerLoad";
import { useProfileCardTable } from "./api/useProfileCardFormApi";
import { GetResponseAcceptedCartridgeByUserDtoMySchema } from "./shema";
import { decryptedProfile } from "@/app/helpers/decryptedProfile";

export default function ProfileTable() {
  const user = decryptedProfile();
  const { data, isSuccess } = useProfileCardTable(user.id);

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
