import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useIndexReactQuery } from "@api/indexReactQuery";

export function UsersTable() {
  const { userGetAll } = useIndexReactQuery();

  return userGetAll.isSuccess ? (
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
        {userGetAll.data.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.username}</TableCell>
            <TableCell className="w-[300px]">{`${item.lastname} ${item.name} ${item.patronimyc}`}</TableCell>
            <TableCell className="w-[300px]">{item.role.roleName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div>Скелетон нужен</div>
  );
}
