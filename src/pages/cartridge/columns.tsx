import DataTableColumnHeader from "@/shared/kit/DataTable/DataTableColumnHeader";
import { formateDate } from "@/shared/helpers/formateDate";
import type { GetResponseAllDetailedCartridgeModelDtoSchema } from "@api/gen";
import { type ColumnDef } from "@tanstack/react-table";

//Подумать о дополнительных колонках
export const columns: ColumnDef<GetResponseAllDetailedCartridgeModelDtoSchema>[] =
  [
    {
      id: "Модель",
      accessorKey: "name",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Модель" />;
      },
      sortingFn: "text",
    },
    {
      id: "Добавлена",
      accessorKey: "createdAt",
      accessorFn: (row) => new Date(row.createdAt),
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Добавлена" />;
      },
      sortingFn: "datetime",
      enableMultiSort: true,
      cell: (props) => {
        return <span>{formateDate(props.row.original.createdAt)}</span>;
      },
    },
    {
      id: "Создатель",
      accessorFn: (row) =>
        `${String(row.creator?.lastname)} ${String(row.creator?.name)} ${String(
          row.creator?.patronimyc,
        )}`,
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Создатель" />;
      },
      sortingFn: "text",
    },
    {
      id: "Действия",
      //Позже буду в компонент передать row
      cell: () => {
        return <></>;
      },
    },
  ];
