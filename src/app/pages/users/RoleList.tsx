import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import { SelectItem } from "@/components/ui/select";

export function RoleList() {
  const { getUserRoles } = useIndexReactQuery();

  return getUserRoles.isSuccess ? (
    getUserRoles.data.data.map((item) => (
      <SelectItem key={item.roleName} value={item.id.toString()}>
        {item.roleName}
      </SelectItem>
    ))
  ) : (
    <div>Идёт загрузка данных</div>
  );
}
