import { useIndexReactQuery } from "@/app/api/indexReactQuery";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//Первая загрузка - 4 рендера
//Повторные переходы - 1 рендер
export function UsersTable() {
  const { isSuccess, data } = useIndexReactQuery().userGetAll;

  return isSuccess ? (
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
        {data.data.map((item) => (
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
