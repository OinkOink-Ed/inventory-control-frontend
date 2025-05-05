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
import KabinetSkeleton from "./KabinetSkeleton";

export function KabinetTable() {
  const { data, isSuccess } = useIndexReactQuery().kabinetsGetAll;

  return isSuccess ? (
    <Table>
      <TableCaption>Кабинеты</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Подразделение</TableHead>
          <TableHead>Номер кабинета</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.division?.name}</TableCell>
            <TableCell className="w-[300px]">{item.number}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <KabinetSkeleton />
  );
}
