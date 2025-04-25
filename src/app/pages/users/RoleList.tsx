import { SelectItem } from "@/components/ui/select";
import { useIndexReactQuery } from "@api/indexReactQuery";

export function RoleList() {
  const { roleGetAll } = useIndexReactQuery();

  return roleGetAll.isSuccess ? (
    roleGetAll.data.data.map((item) => (
      <SelectItem key={item.roleName} value={item.id.toString()}>
        {item.roleName}
      </SelectItem>
    ))
  ) : (
    <div>Идёт загрузка данных</div>
  );
}
