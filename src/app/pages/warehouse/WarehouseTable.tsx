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

export function WarehouseTable() {
  const { id } = useParams<{ id: string }>();
  const warehouseId = parseInt(id!);
  const { cartridgesGetByWarehouseId } = useIndexReactQuery(warehouseId);

  return cartridgesGetByWarehouseId.isSuccess ? (
    <Table>
      <TableCaption>Картриджи</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Модель</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartridgesGetByWarehouseId.data.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.model?.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <SpinnerLoad />
  );
}
