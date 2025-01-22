import { modelCartridgesControllerGetAll } from "@/app/api/generated";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formateDate } from "@/app/helpers/formateDate";

export function SupplementTable() {
  const modelCartridges = useQuery({
    queryKey: ["modelsCartridges"],
    queryFn: modelCartridgesControllerGetAll,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      return data.data.map((item) => ({
        ...item,
        createdAt: formateDate(item.createdAt),
        updatedAt: formateDate(item.updatedAt),
      }));
    },
  });

  return modelCartridges.isSuccess ? (
    <Table>
      <TableCaption>Модели картриджей</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Модель</TableHead>
          <TableHead>Создатель</TableHead>
          <TableHead>Дата создания</TableHead>
          <TableHead>Дата изменения</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modelCartridges.data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.modelName}</TableCell>
            <TableCell>
              {item.creator.name} {item.creator.patronimyc}
              {item.creator.surname}
            </TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell>{item.updatedAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    //Можно отображать скелетон пока идёт загрузка
    <div>Загрузка</div>
  );
}
