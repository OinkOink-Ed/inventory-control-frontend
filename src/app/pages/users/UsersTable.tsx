import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function UsersTable() {
  const { getUsers } = useIndexReactQuery();

  return getUsers.isSuccess ? (
    <Table>
      <TableCaption>Список пользователей</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Логин пользователя</TableHead>
          <TableHead>ФИО пользователя</TableHead>
          <TableHead>Роль пользователя</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getUsers.data.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.nickname}</TableCell>
            <TableCell className="w-[300px]">{`${item.surname} ${item.name} ${item.patronimyc}`}</TableCell>
            <TableCell className="w-[300px]">{item.role.roleName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div>Скелетон нужен</div>
  );
}
