import { GetResponseAllUserDtoSchema } from "@/app/api/generated";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import DataTableColumnHeaderMultiSort from "@/components/DataTable/DataTableColumnHeaderMultiSort";
import DataTableRowActions from "@/components/DataTable/DataTableRowActions";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<GetResponseAllUserDtoSchema>[] = [
  {
    id: "Логин",
    accessorKey: "username",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Логин" />;
    },
    sortingFn: "text",
  },
  {
    id: "ФИО",
    accessorFn: (row) => `${row.lastname} ${row.name} ${row.patronimyc}`,
    header: ({ column }) => {
      return <DataTableColumnHeaderMultiSort column={column} title="ФИО" />;
    },
    sortingFn: "text",
    enableMultiSort: true,
  },
  {
    id: "Роль",
    accessorKey: "role.roleName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Роль" />;
    },
    sortingFn: "text",
    filterFn: (row, id, value: string[]) => {
      return value.includes(row.getValue(id));
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
