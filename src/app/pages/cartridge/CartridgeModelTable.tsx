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
import CartrideModelSkeleton from "./CartrideModelSkeleton";

export function CartridgeModelTable() {
  const { data, isSuccess } = useIndexReactQuery().cartridgeModelGetAll;

  return isSuccess ? (
    <Table>
      <TableCaption>Модели картриджей</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Модель картриджа</TableHead>
          {/* <TableHead>Дата создания</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.name}</TableCell>
            {/* <TableCell className="w-[300px]">{item.id}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <CartrideModelSkeleton />
  );
}
