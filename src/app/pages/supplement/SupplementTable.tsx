import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SupplementSkeleton from "./SupplementSkeleton";
import { useIndexReactQuery } from "@api/indexReactQuery";

export function SupplementTable() {
  const { cartridgeModelGetAll } = useIndexReactQuery();

  return cartridgeModelGetAll.isSuccess ? (
    <Table>
      <TableCaption>Модели картриджей</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Модель картриджа</TableHead>
          <TableHead>Дата создания</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartridgeModelGetAll.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="w-[300px]">{item.name}</TableCell>
            {/* <TableCell className="w-[300px]">{item.createdAt}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <SupplementSkeleton />
  );
}
