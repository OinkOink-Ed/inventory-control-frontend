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
import { useParams } from "react-router";
import { SpinnerLoad } from "@/components/SpinnerLoad";

export function DivisionTable() {
  const { id } = useParams<{ id: string }>();
  const divisionId = parseInt(id!);
  const { kabinetsGetByDivisionId } = useIndexReactQuery(divisionId);

  return kabinetsGetByDivisionId.isSuccess ? (
    <Table>
      <TableCaption>Кабинеты</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Номер кабинета</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {kabinetsGetByDivisionId.data.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.number}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <SpinnerLoad />
  );
}
