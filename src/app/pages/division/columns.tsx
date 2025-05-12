import { GetResponseKabinetsDtoSchema } from "@/app/api/generated";
import { formateDate } from "@/app/helpers/formateDate";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import DataTableRowActions from "@/components/DataTable/DataTableRowActions";
import { ColumnDef } from "@tanstack/react-table";

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
      return <DataTableColumnHeader column={column} title="Состояние" />;
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
      return <span>{`${formateDate(props.row.original.createdAt)}`}</span>;
    },
  },
  {
    id: "Действия",
    //Позже буду в компонент передать row
    cell: () => {
      return <DataTableRowActions />;
    },
  },
];
