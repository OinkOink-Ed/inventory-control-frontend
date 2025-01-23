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
import { useIndexReactQuery } from "@/app/api/indexReactQuery";

export function SupplementTable() {
  const { getModelCartridges } = useIndexReactQuery();

  return getModelCartridges.isSuccess ? (
    <Table>
      <TableCaption>Модели картриджей</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Модель картриджа</TableHead>
          <TableHead>Модель принтера</TableHead>
          <TableHead>Создатель</TableHead>
          <TableHead>Дата создания</TableHead>
          <TableHead>Дата изменения</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getModelCartridges.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.modelName}</TableCell>
            <TableCell>{item.printerName}</TableCell>
            <TableCell>
              {`${item.creator.name} ${item.creator.patronimyc} ${item.creator.surname}`}
            </TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <SupplementSkeleton />
  );
}
