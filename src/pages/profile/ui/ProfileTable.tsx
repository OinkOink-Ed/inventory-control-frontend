import { DataTable } from "@/shared/kit/index";
import { Spinner } from "@/ui/spinner";
import { useProfileContext } from "@/shared/providers";
import { useProfileCardTable } from "@pages/profile/api/useProfileCardFormApi.tsx";
import type { GetResponseAcceptedCartridgeByUserDtoMySchema } from "@pages/profile/model/validation/shema.ts";
import { columns } from "@pages/profile/model/columns.tsx";

export default function ProfileTable() {
  const { id } = useProfileContext();

  const { data, isSuccess } = useProfileCardTable(id);

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
