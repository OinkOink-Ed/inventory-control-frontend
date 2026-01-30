import { formateDate } from "@/lib/index.ts";
import { DataTableColumnHeader } from "@/shared/kit";
import type { GetResponseKabinetsDtoSchema } from "@api/gen";
import { type ColumnDef } from "@tanstack/react-table";

//Подумать о дополнительных колонках
export const columns: ColumnDef<GetResponseKabinetsDtoSchema>[] = [
  {
    id: "Номер",
    accessorKey: "number",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Номер" />;
    },
    sortingFn: "text",
  },
  {
    id: "Подразделение",
    accessorKey: "division.name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Подразделение" />;
    },
    sortingFn: "text",
  },
  {
    id: "Добавлен",
    accessorKey: "createdAt",
    accessorFn: (row) => new Date(row.createdAt),
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Добавлен" />;
    },
    sortingFn: "datetime",
    enableMultiSort: true,
    cell: (props) => {
      return <span>{formateDate(props.row.original.createdAt)}</span>;
    },
  },
  {
    id: "Действия",
    //Позже буду в компонент передать row
    cell: () => {
      return <></>;
    },
  },
];
